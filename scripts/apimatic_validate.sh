#!/bin/bash

# Input arguments
portal_folder="$1"
ignored_warnings_file="$portal_folder/ignored-warnings.txt"

validate_url="https://api.apimatic.io/validation/validate-via-file"
api_headers="Accept: application/json"
api_token=$APIMATIC_API_KEY

if [ "$GITHUB_STEP_SUMMARY" = "" ]; then
  GITHUB_STEP_SUMMARY=/dev/null
fi

if [ "$portal_folder" = "" ]; then
    echo "[ERROR] No command line input provided for \$portal_folder"
    exit 1
fi

if [ "$api_token" = "" ]; then
    echo "[ERROR] No APIMATIC_API_KEY env variable provided"
    exit 1
fi

if [ "$ignored_warnings_file" = "" ]; then
    ignored_warnings_template=()
else
  IFS=$'\r\n' GLOBIGNORE='*' command eval  'ignored_warnings_template=($(cat $ignored_warnings_file))'
fi

mkdir -p build/validate
rm -rf build/validate/spec
cp -r "$portal_folder/spec" build/validate
(cd build/validate/spec/ && zip -qq -r ../input.zip .)

echo "Validating : $portal_folder"


# Send POST request to validate spec
response=$(curl -X POST -sSL \
  --url "$validate_url" \
  -H "$api_headers" \
  -H "Authorization: X-Auth-Key $api_token" \
  -F "file=@build/validate/input.zip"
  )

success=$(echo "$response" | jq -r '.success')
errors=$(echo "$response" | jq -r '.errors[]')
messages=$(echo "$response" | jq -r '.messages[]')
all_warnings=()
IFS=$'\r\n' GLOBIGNORE='*' command eval  'all_warnings=($(echo "$response" | jq -r '.warnings[]'))'

filtered_warnings=""
ignored_warnings=""

for line in "${all_warnings[@]}"; do
  is_ignored=false
  for ignored_item in "${ignored_warnings_template[@]}"; do
    if [[ "$line" == *"$ignored_item"* ]]; then
      is_ignored=true
      break
    fi
  done

  if $is_ignored; then
    ignored_warnings="$ignored_warnings"$'\n'"$line"
  else
    success=false
    filtered_warnings="$filtered_warnings"$'\n'"$line"
  fi
done

ignored_warnings="${ignored_warnings:1}"
filtered_warnings="${filtered_warnings:1}"

print_list(){
  if [ "$1" != "" ]; then
      echo "<ol>" >> "$GITHUB_STEP_SUMMARY"
      echo "$1" | while read -r line; do
        echo "$line"
        echo "<li> $line </li>" >> "$GITHUB_STEP_SUMMARY"
        echo "" >> "$GITHUB_STEP_SUMMARY"
      done
      echo "</ol>" >> "$GITHUB_STEP_SUMMARY"
  fi
}

if [ "$success" != "true" ]; then
  echo "--- Failed ---"
  echo "# Failed" >> "$GITHUB_STEP_SUMMARY"
else
  echo "--- Success ---"
  echo "# Success" >> "$GITHUB_STEP_SUMMARY"
fi

echo "-- Errors --"
echo "<h3>Errors</h3>" >> "$GITHUB_STEP_SUMMARY"
print_list "$errors"

echo "-- Warnings --"
echo "<h3>Warnings</h3>" >> "$GITHUB_STEP_SUMMARY"
print_list "$filtered_warnings"

echo "-- Messages --"
echo "<h3>Messages</h3>" >> "$GITHUB_STEP_SUMMARY"
print_list "$messages"

echo "-- Ignored Warnings --"
echo "<h3>Ignored Warnings</h3>" >> "$GITHUB_STEP_SUMMARY"
print_list "$ignored_warnings"

if [ "$success" != "true" ]; then
  exit 1
fi

#!/bin/sh

api_token=$APIMATIC_API_KEY

if [ "$GITHUB_STEP_SUMMARY" = "" ]; then
  GITHUB_STEP_SUMMARY=/dev/null
fi

if [ "$api_token" = "" ]; then
  echo "[ERROR] No APIMATIC_API_KEY env variable provided. Set APIMATIC_API_KEY environment variable to a valid key."
  exit 1
fi

rm -rf build
mkdir -p build/portal
mkdir -p build/tmp/download

cp -r ./portal build/tmp/portal
cp -r openapi/advanced-billing/ build/tmp/portal/spec/

# overwrite base url for staging
if [ "$BASE_URL" != "" ]; then
  sed -i '.backup' -e "s,\"baseUrl\": \"./\",\"baseUrl\": \"$BASE_URL\",g" ./build/tmp/portal/APIMATIC-BUILD.json
  rm ./build/tmp/portal/APIMATIC-BUILD.json.backup
fi

(cd build/tmp/portal/ && zip -qq -r ../input.zip .)

echo "Generating portal"
echo "Generating portal" >> "$GITHUB_STEP_SUMMARY"

RESPONSE=$(curl -X POST -sSL \
  --write-out '%{http_code}:::%{content_type}' \
  --url 'https://api.apimatic.io/portal' \
  -H "Authorization: X-Auth-Key $api_token" \
  -F "file=@build/tmp/input.zip" \
  --output-dir "build/tmp/download" -OJ)

echo "RESPONSE=$RESPONSE"

HTTP_CODE=$(echo "$RESPONSE" | awk -F ":::" '{print $1}')
CONTENT_TYPE=$(echo "$RESPONSE" | awk -F ":::" '{print $2}')

echo "HTTP_CODE=$HTTP_CODE"
echo "CONTENT_TYPE=$CONTENT_TYPE"

echo "HTTP_CODE=$HTTP_CODE" >> "$GITHUB_STEP_SUMMARY"
echo "CONTENT_TYPE=$CONTENT_TYPE" >> "$GITHUB_STEP_SUMMARY"

if [ "$HTTP_CODE" != "200" ]; then
  echo "# Failed" >> "$GITHUB_STEP_SUMMARY"
  if [ "$CONTENT_TYPE" = "application/zip" ]; then
    echo "Portal build failed, See: build/error for details"
    echo "Portal build failed, See: build/error for details" >> "$GITHUB_STEP_SUMMARY"
    (cd build/tmp/download && unzip -qq error.zip -d error)
    /bin/mv -f build/tmp/download/error/ build/error
    exit 1
  else
    echo "Portal build failed with message: $(cat build/tmp/download/portal)"
    echo "Portal build failed with message: $(cat build/tmp/download/portal)" >> "$GITHUB_STEP_SUMMARY"
    exit 1
  fi
else
  rm -rf build/static-portal
  (cd build/tmp/download && unzip -qq portal.zip -d ../../static-portal)
  /bin/mv -f build/static-portal/apimatic-debug/ build/apimatic-debug
  echo "# Success" >> "$GITHUB_STEP_SUMMARY"
  echo "Success. Go to build/static-portal and run 'http-server' (you need to install http-server first: 'npm install http-server -g')"
fi

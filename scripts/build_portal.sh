#!/bin/sh

api_token=$APIMATIC_API_KEY

if [ "$GITHUB_STEP_SUMMARY" = "" ]; then
  GITHUB_STEP_SUMMARY=/dev/null
fi

if [ "$api_token" = "" ]; then
  echo "[ERROR] No APIMATIC_API_KEY env variable provided. Set APIMATIC_API_KEY environment variable to a valid key."
  exit 1
fi

if [ "$1" = "" ]; then
  legacy_portal_url='https://prod-developers.maxio.com/legacy/'
else
  legacy_portal_url=$1
fi


rm -rf build
mkdir -p build/portal
mkdir -p build/tmp/download

cp -r ./portal build/tmp/portal

# overwrite base url
if [ "$INCLUDE_GOOGLE_ANALYTICS" = "true" ]; then
  HEAD_INCLUDE=$(cat ./scripts/google_analytics_tag_head.txt)
  TAIL_INCLUDE=$(cat ./scripts/google_analytics_tag_body.txt)
else
  HEAD_INCLUDE=""
  TAIL_INCLUDE=""
fi
echo "Overriding head and tail includes" | tee -a "$GITHUB_STEP_SUMMARY"
sed -i '.backup' -e "s,--HEAD-INCLUDES-PLACEHOLDER--,$HEAD_INCLUDE,g" ./build/tmp/portal/APIMATIC-BUILD.json
sed -i '.backup' -e "s,--TAIL-INCLUDES-PLACEHOLDER--,$TAIL_INCLUDE,g" ./build/tmp/portal/APIMATIC-BUILD.json

if [ "$BASE_URL" = "" ]; then
  BASE_URL="http://localhost:8080"
fi
echo "Overriding base url with $BASE_URL" | tee -a "$GITHUB_STEP_SUMMARY"
sed -i '.backup' -e "s,--BASE-URL-PLACEHOLDER--,$BASE_URL,g" ./build/tmp/portal/APIMATIC-BUILD.json
rm ./build/tmp/portal/APIMATIC-BUILD.json.backup

echo "Overriding legacy portal url with $legacy_portal_url" | tee -a "$GITHUB_STEP_SUMMARY"
sed -i '.backup' -e "s,--URL_PLACEHOLDER--,$legacy_portal_url,g" ./build/tmp/portal/content/toc.yml
rm ./build/tmp/portal/content/help/legacy.md.backup

(cd build/tmp/portal/ && zip -qq -r ../input.zip .)

echo "Generating portal" | tee -a "$GITHUB_STEP_SUMMARY"


RESPONSE=$(curl -X POST -sSL \
  --write-out '%{http_code}:::%{content_type}' \
  --url 'https://api.apimatic.io/portal' \
  -H "Authorization: X-Auth-Key $api_token" \
  -F "file=@build/tmp/input.zip" \
  --output-dir "build/tmp/download" -OJ)

echo "RESPONSE=$RESPONSE"

HTTP_CODE=$(echo "$RESPONSE" | awk -F ":::" '{print $1}')
CONTENT_TYPE=$(echo "$RESPONSE" | awk -F ":::" '{print $2}')

echo "HTTP_CODE=$HTTP_CODE" | tee -a "$GITHUB_STEP_SUMMARY"
echo "CONTENT_TYPE=$CONTENT_TYPE" | tee -a "$GITHUB_STEP_SUMMARY"

if [ "$HTTP_CODE" != "200" ]; then
  echo "# Failed" | tee -a "$GITHUB_STEP_SUMMARY"
  if [ "$CONTENT_TYPE" = "application/zip" ]; then
    echo "Portal build failed, See: build/error for details" | tee -a "$GITHUB_STEP_SUMMARY"
    (cd build/tmp/download && unzip -qq error.zip -d error)
    /bin/mv -f build/tmp/download/error/ build/error
    exit 1
  else
    echo "Portal build failed with message: $(cat build/tmp/download/portal)" | tee -a "$GITHUB_STEP_SUMMARY"
    exit 1
  fi
else
  rm -rf build/static-portal
  (cd build/tmp/download && unzip -qq portal.zip -d ../../static-portal)
  /bin/mv -f build/static-portal/apimatic-debug/ build/apimatic-debug
  /bin/mv -f build/static-portal/static/sdks build/sdks
  /bin/cp portal.v7-uber.js build/static-portal/static/js/portal.v7-uber.js
  /bin/cp portal.v7-uber.js.LICENSE.txt build/static-portal/static/js/portal.v7-uber.js.LICENSE.txt
  echo "## Portal generated with success" >> "$GITHUB_STEP_SUMMARY"
  echo "Success. Go to build/static-portal and run 'http-server' (you need to install http-server first: 'npm install http-server -g')"
fi

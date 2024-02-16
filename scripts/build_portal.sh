#!/bin/sh

api_token=$APIMATIC_API_KEY

if [ "$api_token" = "" ]; then
  echo "[ERROR] No APIMATIC_API_KEY env variable provided. Set APIMATIC_API_KEY environment variable to a valid key."
  exit 1
fi

rm -rf build
mkdir -p build/portal
mkdir -p build/tmp/download

cp -r ./portal build/tmp/portal
mkdir -p build/tmp/portal/spec/reference

cp reference/Chargify-API.v1.yaml build/tmp/portal/spec/reference/Chargify-API.v1.yaml
cp -r components build/tmp/portal/spec/

(cd build/tmp/portal/ && zip -qq -r ../input.zip .)

echo "Generating portal"

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

if [ "$HTTP_CODE" != "200" ]; then
  if [ "$CONTENT_TYPE" = "application/zip" ]; then
    echo "Portal build failed, See: build/error for details"
    (cd build/tmp/download && unzip -qq error.zip -d error)
    /bin/mv -f build/tmp/download/error/ build/error
    exit 1
  else
    echo "Portal build failed with message: $(cat build/tmp/download/portal)"
    exit 1
  fi
else
  rm -rf build/static-portal
  (cd build/tmp/download && unzip -qq portal.zip -d ../../static-portal)
  /bin/mv -f build/static-portal/apimatic-debug/ build/apimatic-debug
  echo "Success. Go to build/static-portal and run 'http-server' (you need to install http-server first: 'npm install http-server -g')"
fi

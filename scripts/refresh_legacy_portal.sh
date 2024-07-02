#!/bin/sh
BASE_URL="http://localhost:8080" ./scripts/build_legacy_portal.sh "https://staging-developers.maxio.com/main/http/getting-started/maxio-developer-portal" || exit
cd build/static-portal || exit
http-server --cors -p 8080

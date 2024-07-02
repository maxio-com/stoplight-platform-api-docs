#!/bin/sh
./scripts/build_portal.sh || exit
cd build/static-portal || exit
http-server --cors -p 8080

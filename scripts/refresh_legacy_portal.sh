#!/bin/sh
./scripts/build_legacy_portal.sh "$1"
cd build/static-portal || exit
http-server

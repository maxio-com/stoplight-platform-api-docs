#!/bin/sh
./scripts/build_portal.sh
cd build/static-portal || exit
http-server

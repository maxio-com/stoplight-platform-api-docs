#!/bin/sh

cp ./scripts/_stoplight_id_redirects build/static-portal
cat ./scripts/_redirects_legacy >> build/static-portal/_redirects
cat ./scripts/_static_redirects >> build/static-portal/_redirects

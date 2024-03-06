#!/bin/sh

awk '/<\/head>/ && !f {system("cat ./scripts/google_analytics_tag_head.txt"); f=1} 1' ./build/static-portal/index.html > tmp_index.html && mv tmp_index.html ./build/static-portal/index.html
awk '/<body>/ && !f {print; system("cat ./scripts/google_analytics_tag_body.txt"); f=1; next} 1' ./build/static-portal/index.html > tmp_index.html && mv tmp_index.html ./build/static-portal/index.html

#!/bin/sh


awk '/<\/head>/ && !f {system("cat ./scripts/google_meta_tag.txt"); f=1} 1' ./build/static-portal/index.html > tmp_index.html && mv tmp_index.html ./build/static-portal/index.html

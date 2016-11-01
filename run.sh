#!/bin/bash
cp ./temp/* ./source
rm -rf ./target
localdir="$(pwd)"
echo "--------------"
echo "$localdir/target"
node index.js "$localdir/target" "$localdir/source" "$localdir/source/pages-link_xXxXx.txt" "_xXxXx" "$localdir/main-pages_xXxXx.html"
<<COMMENT1
COMMENT1

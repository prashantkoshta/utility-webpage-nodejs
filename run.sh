#!/bin/bash
cp ./temp/* ./source
rm -rf ./target
localdir="$(pwd)"
node index.js "$localdir/target" "$localdir/source" "$localdir/source/pages-link_xXxXx.txt" "_xXxXx" "main-pages_xXxXx.html"
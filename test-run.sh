#!/bin/bash
cp ./temp/* ./test/testdata/source
rm -rf ./test/testdata/target
npm test
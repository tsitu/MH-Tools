#!/usr/bin/env bash

cp *.html out/
cp -r data/ out/
cp -r lib/ out/
cp -r src/main out/src/
cp -r src/utils out/src/
mkdir -p out/src/bookmarklet
cp src/bookmarklet/*.min.js out/src/bookmarklet/

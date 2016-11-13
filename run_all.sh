#!/usr/bin/env bash

set -e

for testFile in $(ls test/*.js); do
    node ${testFile}
done

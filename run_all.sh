#!/usr/bin/env bash

set -e

ls test/*.js | xargs -I {} node {}

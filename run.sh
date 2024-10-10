#!/bin/bash
mkdir /tmp/cache
ln -s /tmp/cache standalone/.next/cache
node standalone/server.js
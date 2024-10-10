#!/bin/bash
mkdir /tmp/cache
ln -s /tmp/cache standlone/.next/cache
node standalone/server.js
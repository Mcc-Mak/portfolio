#!/bin/bash
set -e

# Start MongoDB in the background (mongod is already installed)
# The official mongo image uses /data/db as default data dir
echo "Starting MongoDB..."
mongod --fork --logpath /var/log/mongodb.log --bind_ip_all

sleep infinity

#!/bin/bash
# Make sure this file has executable permissions, run `chmod +x run-worker.sh`

# This command runs the queue worker. 
php bin/console messenger:consume async --time-limit=3600 --memory-limit=128M &
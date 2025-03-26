#!/bin/bash
# Make sure this file has executable permissions, run `chmod +x run-cron.sh`

# This block of code runs the scheduler every minute
while [ true ]
    do
        echo "Running the scheduler..."
        php bin/console cron:start [--blocking] --no-interaction &
        sleep 60
    done
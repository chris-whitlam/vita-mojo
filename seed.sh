#! /bin/bash

if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

echo "Unzipping dump..."
tar -xzf dump.tar.gz
echo "Unzip complete"
echo "Starting import..."
mysql -h 127.0.0.1 -u$DB_USER -p$DB_PASSWORD < dump.sql
echo "Import finished"

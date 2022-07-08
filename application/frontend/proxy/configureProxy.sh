#!/bin/bash

# Remove previous proxy pass entries
sed -i "/proxy_pass/d" /etc/nginx/conf.d/default.conf

# Set default values
host=localhost
port=8080

# Check if the required env variables are set otherwise localhost will be used.
if [ -n "$API_HOST" ]; then
  host=$API_HOST
fi

if [ -n "$API_PORT" ]; then
  port=$API_PORT
fi


# add the proxy pass and store the conf into the nginx conf directory
sed -i -e "/# pathToApi/i\\
  proxy_pass http://$host:$port;" /etc/nginx/conf.d/default.conf


nginx -g "daemon off;"

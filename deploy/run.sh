#! /usr/bin/env bash

ESCAPED_BASE_URL="${BASE_PROTOCOL}:\/\/${BASE_DOMAIN}"
sed -i "s/BASE_URL/$ESCAPED_BASE_URL/g" /oneteamweb/conf.json

nginx -g "daemon off;"

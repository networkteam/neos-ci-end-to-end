#!/bin/sh -e

echo "Waiting for DB connection..."

TIMEOUT=100 wait-for-it.sh $FLOW_POSTGRESQL_HOST:$FLOW_POSTGRESQL_PORT

echo "Setting up DB schema..."
./flow doctrine:migrate

# echo "Execute command migrations..."
# ./flow networkteam.flow.commandmigrations:commandmigrations:migrate

# If an admin user name is specified, the user is created
if [ -n "$NEOS_CREATE_ADMIN_USER_NAME" ]; then
  if ./flow user:show $NEOS_CREATE_ADMIN_USER_NAME > /dev/null; then
    echo "Admin user already exists, skipping creation"
  else
    echo "Creating admin user: $NEOS_CREATE_ADMIN_USER_NAME"
    ./flow user:create --roles Administrator $NEOS_CREATE_ADMIN_USER_NAME $NEOS_CREATE_ADMIN_USER_PASSWORD John Snow
  fi
fi

# If a site package key is specified, the site is imported
if [ -n "$NEOS_IMPORT_SITE_PACKAGE_KEY" ]; then
  if ./flow site:list|grep $NEOS_IMPORT_SITE_PACKAGE_KEY > /dev/null; then
    echo "Site already exists, skipping import"
  else
    echo "Importing site: $NEOS_IMPORT_SITE_PACKAGE_KEY"
    ./flow site:import --package-key $NEOS_IMPORT_SITE_PACKAGE_KEY
  fi
fi

echo "Publishing resources..."
./flow resource:publish

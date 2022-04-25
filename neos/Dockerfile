FROM registry.networkteam.com/networkteam/docker/php/8.1

ENV PHP_EXTENSION_PGSQL=1 \
    PHP_EXTENSION_GMAGICK=1 \
    FLOW_CONTEXT=Production/Docker

# Copy project source code
COPY ./flow ./
COPY ./Web/index.php ./Web/
COPY ./Configuration ./Configuration
COPY ./Packages ./Packages
COPY ./Docker ./Docker

# Make sure that Exceptions can be written
RUN mkdir -p Data/Logs/Exceptions

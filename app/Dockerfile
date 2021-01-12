FROM alpine:3.11

ENV TIMEZONE=Europe/Paris \
    LANGUAGE=fr_FR.UTF-8 \
    LANG=fr_FR.UTF-8 \
    LC_ALL=fr_FR.UTF-8

ARG UID=501
ARG GID=502

RUN apk update && apk upgrade --force && apk add --no-cache \
    sudo \
    supervisor \
    openrc \
    nginx \
    php7 \
    php7-bcmath \
    php7-ctype \
    php7-dom \
    php7-tokenizer \
    php7-curl \
    php7-fpm \
    php7-gd \
    php7-iconv \
    php7-intl \
    php7-json \
    php7-mbstring \
    php7-mcrypt \
    php7-xmlwriter \
    php7-mysqlnd \
    php7-opcache \
    php7-openssl \
    php7-pdo \
    php7-pdo_mysql \
    php7-pdo_pgsql \
    php7-pdo_sqlite \
    php7-phar \
    php7-posix \
    php7-session \
    php7-soap \
    php7-xml \
    php7-zip

RUN apk add --no-cache \
    git \
    make \
    openssl \
    openssl-dev \
    ca-certificates \
    bash \
    nano \
    bash-completion \
    curl \
    coreutils \
    gettext \
    tzdata

RUN rm /var/cache/apk/* && \
    mkdir -p /www

COPY ./dockerfs/nginx /etc/nginx
COPY ./dockerfs/php /etc/php7
COPY ./dockerfs/supervisord.conf /etc/supervisord.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /www
COPY composer.* ./
COPY . .

COPY --from=registry.lucasrobin.fr/i2fc-apc-report-static /app/dist/public ./public
COPY --from=registry.lucasrobin.fr/i2fc-apc-report-static /app/dist/views ./resources/views

RUN composer install

RUN addgroup --gid $GID www
RUN adduser -D --uid $UID -G www -h /home/www www
RUN chown -R www:www /www

# TEMP : Fix permission denied log file
RUN chmod -R 777 storage/

EXPOSE 80 443

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]


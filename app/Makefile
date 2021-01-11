IMG_NAME=registry.lucasrobin.fr/i2fc-apc-report-app
APP_NAME=i2fc-apc-report-app
APP_PORT=8889

build:
	docker image build \
	--no-cache \
	--file $(PWD)/Dockerfile \
	--tag $(IMG_NAME) \
	.

run:
	docker run -p $(APP_PORT):80 \
    --detach \
    --rm \
	--volume $(CURDIR)/dockerfs/nginx/conf.d:/etc/nginx/conf.d \
	--volume $(CURDIR)/dockerfs/nginx/nginx.conf:/etc/nginx/nginx.conf \
	--volume $(CURDIR)/dockerfs/php/php-fpm.d:/etc/php7/php-fpm.d \
	--volume $(CURDIR)/dockerfs/supervisord.conf:/etc/supervisord.conf \
	--name $(APP_NAME) \
	$(IMG_NAME)

exec:
	docker run \
	-it \
	--rm \
	--volume $(CURDIR)/dockerfs/nginx/conf.d:/etc/nginx/conf.d \
	--volume $(CURDIR)/dockerfs/nginx/nginx.conf:/etc/nginx/nginx.conf \
	--volume $(CURDIR)/dockerfs/php/php-fpm.d:/etc/php7/php-fpm.d \
	--volume $(CURDIR)/dockerfs/supervisord.conf:/etc/supervisord.conf \
	--volume $(CURDIR)/dockerfs/var/log/nginx:/var/log/nginx \
	--publish $(APP_PORT):80 \
	--name $(APP_NAME) \
	$(IMG_NAME) \
	sh





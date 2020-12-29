## Docker-compose
prod:
	docker-compose -f ./docker-compose.yml up --detach

migrate:
	docker-compose exec app php artisan migrate

users:
	docker-compose exec app php artisan db:seed --class=UserSeeder

dev:
	docker-compose down
	docker-compose -f docker-compose.yml -f docker-compose.develop.yml up -d
	cd frontend/ && yarn serve

tinker:
	docker-compose exec app php artisan tinker

cache:
	docker-compose exec app php artisan config:clear && \
	docker-compose exec app php artisan cache:clear && \
	docker-compose exec app php artisan route:clear

## Image de l'app

build:
	docker build \
    -t registry.lucasrobin.fr/i2fc-apc-report-app \
    -t registry.lucasrobin.fr/i2fc-apc-report-app:stable \
    .

run:
	docker run -p 8888:80 \
	--volume $(CURDIR)/dockerfs/nginx/conf.d:/etc/nginx/conf.d \
	--volume $(CURDIR)/dockerfs/nginx/nginx.conf:/etc/nginx/nginx.conf \
	--volume $(CURDIR)/dockerfs/php/php-fpm.d:/etc/php7/php-fpm.d \
	--volume $(CURDIR)/dockerfs/supervisord.conf:/etc/supervisord.conf \
	--name i2fc-apc-report-app \
	registry.lucasrobin.fr/i2fc-apc-report-app

exec:
	docker run -it \
	-p 8888:80 \
	--rm \
	--volume $(CURDIR)/dockerfs/nginx/conf.d:/etc/nginx/conf.d \
	--volume $(CURDIR)/dockerfs/nginx/nginx.conf:/etc/nginx/nginx.conf \
	--volume $(CURDIR)/dockerfs/php/php-fpm.d:/etc/php7/php-fpm.d \
	--volume $(CURDIR)/dockerfs/supervisord.conf:/etc/supervisord.conf \
	--volume $(CURDIR)/dockerfs/var/log/nginx:/var/log/nginx \
	--name i2fc-apc-report-app \
	registry.lucasrobin.fr/i2fc-apc-report-app \
	/bin/bash

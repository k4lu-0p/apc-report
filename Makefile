## Docker-compose
compose:
	docker-compose -f docker-compose.yml up -d

migrate:
	docker-compose exec app php artisan migrate

users:
	docker-compose exec app php artisan db:seed --class=UserSeeder

tinker:
	docker-compose exec app php artisan tinker

cache:
	docker-compose exec app php artisan config:clear && \
	docker-compose exec app php artisan cache:clear && \
	docker-compose exec app php artisan route:clear


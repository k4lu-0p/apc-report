
migrate:
	docker-compose exec app php artisan migrate

users:
	docker-compose exec app php artisan db:seed --class=UserSeeder

dev:
	docker-compose stop && \
	docker-compose up -d && \
	cd frontend/ && \
	yarn serve

tinker:
	docker-compose exec app php artisan tinker

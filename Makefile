## Docker-compose
compose:
	docker-compose -f docker-compose.yml up -d

migrate:
	docker-compose exec app php artisan migrate

users:
	docker-compose exec app php artisan db:seed --class=UserSeeder

settings:
	docker-compose exec app php artisan db:seed --class=SettingSeeder

customers:
	docker-compose exec app php artisan db:seed --class=CustomerSeeder

appointments:
	docker-compose exec app php artisan db:seed --class=AppointmentSeeder

reports:
	docker-compose exec app php artisan db:seed --class=ReportSeeder

tinker:
	docker-compose exec app php artisan tinker

cache:
	docker-compose exec app php artisan config:clear && \
	docker-compose exec app php artisan cache:clear && \
	docker-compose exec app php artisan route:clear

populate:
	docker-compose exec app php artisan db:seed --class=SettingSeeder
	docker-compose exec app php artisan db:seed --class=UserSeeder
	docker-compose exec app php artisan db:seed --class=CustomerSeeder
	docker-compose exec app php artisan db:seed --class=AppointmentSeeder
	

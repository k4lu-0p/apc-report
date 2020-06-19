# Pour créer mon image projet, je pars d'une image de base du hub
FROM php:7.4-fpm

# Arguments qu'on passera depuis le docker-compose.yml
ARG user
ARG uid

# Des utilitaires en plus...
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    cron \
    nano \
    sudo

# Efface le cache de aptitude
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# On copie composer sur notre image depuis sa dernière image du hub
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Créer l'utilisateur qui pourra lancer Composer et Artisan
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# On définit le répertoire de travail par défaut
# C'est notamment celui qui sera directement visible quand on sera en mode -it bash
WORKDIR /var/www

# On se met sur l'utilisateur nouvellement créé
USER $user

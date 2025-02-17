# Utiliser PHP 8.2 avec Apache
FROM php:8.2-apache

# Installer les extensions PHP requises
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libpq-dev libzip-dev \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Installer les dépendances Symfony
RUN composer install --no-dev --optimize-autoloader --no-interaction
# Installer Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    rm composer-setup.php

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier le projet Symfony
COPY . .

# Corriger les permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 777 /var/www/html
RUN mkdir -p var/cache var/log && chown -R www-data:www-data var/cache var/log


# Vider le cache avant l'installation
RUN php bin/console cache:clear --env=prod

# Exposer le port 80 pour Railway
EXPOSE 80

# Lancer Apache
CMD ["apache2-foreground"]

ENV APP_ENV=prod

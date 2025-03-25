FROM php:8.2-apache

# 1. Installer les dépendances
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl opcache mbstring \
    && a2enmod rewrite

# 2. Installer Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php

WORKDIR /var/www/html

# 3. Copier les fichiers composer
COPY composer.json composer.lock ./

# 4. Installer les dépendances
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# 5. Copier l'application
COPY . .

# 6. Configurer Apache
# Après la copie des fichiers
RUN sed -i 's#/var/www/html/public/public#/var/www/html/public#g' /etc/apache2/sites-available/000-default.conf \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf \
    && a2enmod rewrite

# 7. Configurer les permissions
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 var/ \
    && php bin/console cache:clear --env=prod --no-warmup \
    && php bin/console cache:warmup --env=prod

# 8. Port dynamique pour Railway
RUN echo "Listen ${PORT:-80}" > /etc/apache2/ports.conf

EXPOSE 80
CMD ["apache2-foreground"]
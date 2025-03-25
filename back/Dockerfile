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
COPY apache-config/000-default.conf /etc/apache2/sites-available/
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf \
    && a2ensite 000-default

# 7. Configurer les permissions
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 var/ public/ \
    && php bin/console cache:clear --env=prod

EXPOSE 80
CMD ["apache2-foreground"]
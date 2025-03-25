FROM php:8.2-apache

# 1. Installer les dépendances système + Composer PROPERLY
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl \
    && a2enmod rewrite \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 2. Configurer l'environnement
WORKDIR /var/www

# 3. Installer les dépendances en premier (optimisation cache Docker)
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

# 4. Copier le reste de l'application
COPY . .

# 5. Configurer Apache
COPY apache-config/000-default.conf /etc/apache2/sites-available/
RUN a2ensite 000-default

# 6. Permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 var/

EXPOSE 80
CMD ["apache2-foreground"]
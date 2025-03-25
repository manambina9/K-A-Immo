FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl \
    && a2enmod rewrite

WORKDIR /var/www

COPY composer.* ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

COPY . .

RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 var/

COPY apache-config/000-default.conf /etc/apache2/sites-available/
RUN a2ensite 000-default

EXPOSE 80
CMD ["apache2-foreground"]
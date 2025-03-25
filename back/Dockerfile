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

# 3. Préparer les dossiers de cache AVANT la copie
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data var/ \
    && chmod -R 777 var/

# 4. Copier les fichiers composer
COPY composer.json composer.lock ./

# 5. Installer les dépendances
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# 6. Copier l'application
COPY . .

# 7. Configurer Apache
COPY apache-config/000-default.conf /etc/apache2/sites-available/
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf \
    && a2ensite 000-default

# 8. Finaliser les permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 777 var/cache var/log

EXPOSE 80
CMD ["apache2-foreground"]
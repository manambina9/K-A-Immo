FROM php:8.2-apache

# 1. Configuration de base
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    a2enmod rewrite

# 2. Installation des dépendances
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev libpq-dev libonig-dev && \
    docker-php-ext-install pdo pdo_mysql zip intl opcache mbstring

# 3. Installation de Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    rm composer-setup.php

WORKDIR /var/www/html

# 4. Préparation de l'environnement
RUN mkdir -p var/cache var/log && \
    chown -R www-data:www-data /var/www && \
    chmod -R 777 /var/www  # Permission maximale temporaire

# 5. Installation des dépendances
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# 6. Copie de l'application
COPY . .

# 7. Configuration Apache
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf
RUN a2ensite 000-default

# 8. Finalisation
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 775 var/ vendor/ public/ && \
    php bin/console cache:clear --env=prod --no-warmup && \
    php bin/console cache:warmup --env=prod

EXPOSE 80
CMD ["apache2-foreground"]
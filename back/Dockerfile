FROM php:8.2-apache

# 1. Installation des dépendances système
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl opcache mbstring \
    && a2enmod rewrite

# 2. Installation de Composer (méthode officielle)
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php

WORKDIR /var/www

# 3. Copie et validation des fichiers composer
COPY composer.json composer.lock ./
RUN composer validate --no-check-all && \
    composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# 4. Copie du reste de l'application
COPY . .

# 5. Configuration Apache
COPY apache-config/000-default.conf /etc/apache2/sites-available/
RUN a2ensite 000-default

# 6. Configuration des permissions
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /var/www \
    && chmod -R 775 var/ \
    && php bin/console cache:clear --env=prod

EXPOSE 80
CMD ["apache2-foreground"]
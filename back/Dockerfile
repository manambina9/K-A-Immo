FROM php:8.2-apache

# 1. Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl opcache mbstring \
    && a2enmod rewrite

# 2. Configurer le ServerName Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# 3. Installer Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php

WORKDIR /var/www/html

# 4. Créer la structure de dossiers avec les bonnes permissions
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /var/www \
    && chmod -R 777 /var/www

# 5. Copier les fichiers composer
COPY composer.json composer.lock ./

# 6. Installer les dépendances
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# 7. Copier l'application
COPY . .

# 8. Configurer Apache
COPY apache-config/000-default.conf /etc/apache2/sites-available/
RUN a2ensite 000-default

# 9. Ajuster les permissions finales
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 777 var/cache var/log \
    && php bin/console cache:clear --env=prod --no-warmup \
    && php bin/console cache:warmup --env=prod

EXPOSE 80
CMD ["apache2-foreground"]
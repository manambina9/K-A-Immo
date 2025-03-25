FROM php:8.2-apache

# 1. Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl opcache mbstring \
    && a2enmod rewrite

# 2. Installer Composer (méthode plus robuste)
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/bin --filename=composer \
    && php -r "unlink('composer-setup.php');" \
    && chmod +x /usr/bin/composer

# 3. Créer la structure de dossiers nécessaire
WORKDIR /var/www/html
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 var/

# 4. Copier uniquement les fichiers nécessaires pour composer
COPY composer.json composer.lock ./

# 5. Installer les dépendances (avec timeout augmenté)
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts \
    || (echo "Échec de l'installation, tentative avec moins de mémoire..." && COMPOSER_MEMORY_LIMIT=-1 composer install --no-dev --optimize-autoloader --no-interaction --no-scripts)

# 6. Copier le reste de l'application
COPY . .

# 7. Configurer Apache
COPY apache-config/000-default.conf /etc/apache2/sites-available/
RUN a2ensite 000-default

# 8. Finaliser les permissions et cache
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 var/ vendor/ \
    && php bin/console cache:clear --env=prod --no-warmup \
    && php bin/console cache:warmup --env=prod

EXPOSE 80
CMD ["apache2-foreground"]
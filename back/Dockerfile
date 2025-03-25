FROM php:8.2-apache

# Installer les dépendances
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl opcache mbstring \
    && a2enmod rewrite

# Installer Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php

WORKDIR /var/www/html

# Copier les fichiers
COPY . .

# Configurer les permissions
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 var/ public/

# Installer les dépendances
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Configurer Apache
RUN echo "<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
        FallbackResource /index.php\n\
    </Directory>\n\
</VirtualHost>" > /etc/apache2/sites-available/000-default.conf \
    && a2ensite 000-default

# Vider le cache
RUN php bin/console cache:clear --env=prod

EXPOSE 80
CMD ["apache2-foreground"]
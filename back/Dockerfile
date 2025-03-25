FROM php:8.2-apache

# 1. Installation des dépendances système
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl opcache mbstring \
    && a2enmod rewrite

# 2. Installation de Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php

WORKDIR /var/www/html

# 3. Copie des fichiers composer
COPY composer.json composer.lock ./

# 4. Installation des dépendances
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# 5. Copie de l'application (en excluant ce qui est dans .dockerignore)
COPY . .

# 6. Configuration Apache
COPY apache-config/000-default.conf /etc/apache2/sites-available/
RUN sed -i 's#/var/www/html#/var/www/html/public#g' /etc/apache2/sites-available/000-default.conf \
    && a2ensite 000-default

# 7. Configuration des permissions
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 var/ \
    && php bin/console cache:clear --env=prod \
    && php bin/console cache:warmup --env=prod

# 8. Configuration du port dynamique pour Railway
RUN echo "Listen ${PORT:-80}" > /etc/apache2/ports.conf

EXPOSE 80
CMD ["apache2-foreground"]
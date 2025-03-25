FROM php:8.2-apache

# Installer les dépendances
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl \
    && a2enmod rewrite

# Configurer le répertoire de travail
WORKDIR /var/www

# 1. D'abord copier uniquement les fichiers composer
COPY back/composer.* ./

# 2. Installer les dépendances
RUN composer install --no-dev --optimize-autoloader --no-interaction

# 3. Copier tout le reste
COPY back/ .

# Permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 var/

# Configuration Apache
COPY back/apache-config/000-default.conf /etc/apache2/sites-available/
RUN a2ensite 000-default

EXPOSE 80
CMD ["apache2-foreground"]
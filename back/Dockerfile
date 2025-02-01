# Utilisation de l'image officielle PHP avec Apache et Composer
FROM php:8.2-apache

# Installer les extensions nécessaires pour Symfony
RUN apt-get update && apt-get install -y \
    libicu-dev zip unzip git curl libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd intl opcache

# Activer les modules Apache
RUN a2enmod rewrite

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers du projet dans l'image Docker
COPY . /var/www/html

# Installer les dépendances Symfony
RUN composer install --no-dev --optimize-autoloader

# Changer les permissions pour éviter des erreurs
RUN chown -R www-data:www-data /var/www/html/var /var/www/html/public

# Exposer le port 80 pour Apache
EXPOSE 80

# Démarrer Apache
CMD ["apache2-foreground"]

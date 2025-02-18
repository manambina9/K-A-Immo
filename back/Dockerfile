# Utiliser PHP 8.2 avec Apache
FROM php:8.2-apache

# Installer les extensions PHP requises
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libpq-dev libzip-dev \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Activer mod_rewrite pour Symfony
RUN a2enmod rewrite

# Installer Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    rm composer-setup.php

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier le projet Symfony
COPY . .

# Copier le fichier de configuration Apache
COPY apache-config/000-default.conf /etc/apache2/sites-available/000-default.conf

# Activer le site Apache
RUN a2ensite 000-default

# Vérifier et corriger les permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Créer et corriger les permissions des répertoires var/cache et var/log
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data var/cache var/log \
    && chmod -R 777 var/cache var/log

# Installer les dépendances Symfony en mode production
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Vider le cache avant le lancement
RUN php bin/console cache:clear --env=prod

# Exposer le port 80
EXPOSE 80

# Lancer Apache en premier plan
CMD ["apache2-foreground"]

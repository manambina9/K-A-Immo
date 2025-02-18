# Utiliser PHP 8.2 avec Apache
FROM php:8.2-apache

# Installer les extensions PHP requises
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libpq-dev libzip-dev \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Installer Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    rm composer-setup.php

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier le projet Symfony
COPY . .

# Vérifier les permissions actuelles (optionnel)
RUN ls -l /var/www/html

# Corriger les permissions
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Créer les répertoires de cache et de log et corriger les permissions
RUN mkdir -p var/cache var/log && chown -R www-data:www-data var/cache var/log

# Corriger les permissions des répertoires de cache et de log
RUN chmod -R 777 /var/www/html/var/cache
RUN chmod -R 777 /var/www/html/var/log

# Ajouter la directive ServerName pour éviter l'avertissement Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Installer les dépendances Symfony
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Vider le cache avant l'installation
RUN php bin/console cache:clear --env=prod

# Exposer le port 80 pour Railway
EXPOSE 80

# Lancer Apache
CMD ["apache2-foreground"]


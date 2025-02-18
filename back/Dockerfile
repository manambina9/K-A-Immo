# Utiliser PHP 8.2 avec Apache
FROM php:8.2-apache

# Installer les extensions PHP requises
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libpq-dev libzip-dev \
    && docker-php-ext-install intl pdo pdo_mysql zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Activer mod_rewrite pour Symfony
RUN a2enmod rewrite

# Installer Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    rm composer-setup.php

# Définir le répertoire de travail sur le dossier public
WORKDIR /var/www/html/public

# Copier le projet Symfony
COPY . .

RUN chown -R www-data:www-data /var/www/html/public
RUN chmod -R 755 /var/www/html/public


# Créer les répertoires de cache et de log et corriger les permissions
RUN mkdir -p var/cache var/log && chown -R www-data:www-data var/cache var/log
RUN chmod -R 775 var/cache var/log

# Ajouter la directive ServerName pour éviter l'avertissement Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Ajouter une configuration Apache pour Symfony
RUN echo "<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>" > /etc/apache2/conf-available/symfony.conf \
    && a2enconf symfony

# Exécuter les commandes Symfony en tant que www-data
USER www-data

# Installer les dépendances Symfony en mode production
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Vider le cache avant l'installation
RUN php bin/console cache:clear --env=prod

# Revenir à root pour exécuter Apache
USER root

# Exposer le port 80 pour Railway
EXPOSE 80

# Lancer Apache
CMD ["apache2-foreground"]

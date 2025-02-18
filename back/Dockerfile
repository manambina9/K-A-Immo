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

# Supprimer le VirtualHost par défaut et créer un nouveau qui pointe vers /public
RUN rm /etc/apache2/sites-available/000-default.conf
RUN echo "<VirtualHost *:80> \
    DocumentRoot /var/www/html/public \
    <Directory /var/www/html/public> \
        AllowOverride All \
        Require all granted \
    </Directory> \
    ErrorLog \${APACHE_LOG_DIR}/error.log \
    CustomLog \${APACHE_LOG_DIR}/access.log combined \
</VirtualHost>" > /etc/apache2/sites-available/000-default.conf

# Activer la configuration et le module rewrite
RUN a2ensite 000-default.conf && a2enmod rewrite

# Vérifier les permissions actuelles (optionnel)
RUN ls -l /var/www/html

# Corriger les permissions pour éviter les erreurs 403
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html
RUN chown -R www-data:www-data /var/www/html/public
RUN chmod -R 755 /var/www/html/public

# Créer les répertoires de cache et de log et corriger les permissions
RUN mkdir -p var/cache var/log && chown -R www-data:www-data var/cache var/log
RUN chmod -R 777 var/cache var/log

# Ajouter la directive ServerName pour éviter l'avertissement Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Installer les dépendances Symfony
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Vider le cache avant l'installation
RUN php bin/console cache:clear --env=prod

# Activer les logs Apache et Symfony sur Railway
RUN ln -sf /dev/stdout /var/log/apache2/access.log
RUN ln -sf /dev/stderr /var/log/apache2/error.log

# Exposer le port 80 pour Railway
EXPOSE 80

# Lancer Apache
CMD ["apache2-foreground"]

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250510102918 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE demande_de_visite (id INT AUTO_INCREMENT NOT NULL, client_id INT NOT NULL, maison_id INT NOT NULL, date_demande DATETIME NOT NULL, statut VARCHAR(20) NOT NULL, message LONGTEXT DEFAULT NULL, INDEX IDX_DE62244A19EB6921 (client_id), INDEX IDX_DE62244A9D67D8AF (maison_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE demande_de_visite ADD CONSTRAINT FK_DE62244A19EB6921 FOREIGN KEY (client_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE demande_de_visite ADD CONSTRAINT FK_DE62244A9D67D8AF FOREIGN KEY (maison_id) REFERENCES maison_location (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE demande_de_visite DROP FOREIGN KEY FK_DE62244A19EB6921');
        $this->addSql('ALTER TABLE demande_de_visite DROP FOREIGN KEY FK_DE62244A9D67D8AF');
        $this->addSql('DROP TABLE demande_de_visite');
    }
}

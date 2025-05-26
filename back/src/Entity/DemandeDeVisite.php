<?php

namespace App\Entity;

use App\Repository\DemandeDeVisiteRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: DemandeDeVisiteRepository::class)]
class DemandeDeVisite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'demandes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $client = null;

    #[ORM\ManyToOne(inversedBy: 'demandesDeVisite')]
    #[ORM\JoinColumn(nullable: false)]
    private ?MaisonLocation $maison = null;

    #[ORM\Column(type: 'datetime')]
    #[Assert\NotBlank]
    private ?\DateTimeInterface $dateDemande = null;

    #[ORM\Column(type: 'string', length: 20)]
    #[Assert\Choice(choices: ['en_attente', 'acceptee', 'refusee'], message: 'Statut invalide')]
    private string $statut = 'en_attente';

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $message = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClient(): ?User
    {
        return $this->client;
    }

    public function setClient(?User $client): static
    {
        $this->client = $client;
        return $this;
    }

    public function getMaison(): ?MaisonLocation
    {
        return $this->maison;
    }

    public function setMaison(?MaisonLocation $maison): static
    {
        $this->maison = $maison;
        return $this;
    }

    public function getDateDemande(): ?\DateTimeInterface
    {
        return $this->dateDemande;
    }

    public function setDateDemande(\DateTimeInterface $dateDemande): static
    {
        $this->dateDemande = $dateDemande;
        return $this;
    }

    public function getStatut(): string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;
        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): static
    {
        $this->message = $message;
        return $this;
    }
}

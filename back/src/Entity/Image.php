<?php

namespace App\Entity;

use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $url = null;

    #[ORM\ManyToOne(inversedBy: "images")]
    #[ORM\JoinColumn(nullable: false)]
    private ?MaisonLocation $maison = null;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getUrl(): ?string
    {
        return $this->url;
    }
    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getMaison(): ?MaisonLocation
    {
        return $this->maison;
    }
    public function setMaison(?MaisonLocation $maison): self
    {
        $this->maison = $maison;

        return $this;
    }
    public function __toString(): string
    {
        return $this->url;
    }
    public function getImagePath(): string
    {
        return 'uploads/images/' . $this->url;
    }
    
}
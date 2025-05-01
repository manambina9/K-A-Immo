<?php

namespace App\Entity;

use App\Repository\MaisonLocationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: MaisonLocationRepository::class)]
class MaisonLocation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $adresse = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $ville = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $codePostal = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 10)]
    private ?string $description = null;

    #[ORM\Column]
    #[Assert\Positive]
    private ?int $prix = null;

    #[ORM\Column]
    #[Assert\Positive]
    private ?int $surface = null;

    #[ORM\Column]
    #[Assert\PositiveOrZero]
    private ?int $nbChambres = null;

    #[ORM\Column(type: "boolean")]
    private ?bool $disponible = true;

    #[ORM\Column(type: "date")]
    #[Assert\NotNull]
    private ?\DateTimeInterface $dateDisponibilite = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $type = null;

    // Si une seule image : ok
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $images = null;

    #[ORM\Column(nullable: true)]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    private ?float $longitude = null;

    #[ORM\ManyToOne(inversedBy: "maisons")]
    #[ORM\JoinColumn(nullable: true, onDelete: "SET NULL")]
    private ?User $proprietaire = null;    

    public function __construct()
    {

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): self
    {
        $this->adresse = $adresse;
        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(?string $ville): self
    {
        $this->ville = $ville;
        return $this;
    }

    public function getCodePostal(): ?string
    {
        return $this->codePostal;
    }

    public function setCodePostal(?string $codePostal): self
    {
        $this->codePostal = $codePostal;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getPrix(): ?int
    {
        return $this->prix;
    }

    public function setPrix(?int $prix): self
    {
        $this->prix = $prix;
        return $this;
    }

    public function getSurface(): ?int
    {
        return $this->surface;
    }

    public function setSurface(?int $surface): self
    {
        $this->surface = $surface;
        return $this;
    }

    public function getNbChambres(): ?int
    {
        return $this->nbChambres;
    }

    public function setNbChambres(?int $nbChambres): self
    {
        $this->nbChambres = $nbChambres;
        return $this;
    }

    public function isDisponible(): ?bool
    {
        return $this->disponible;
    }

    public function setDisponible(?bool $disponible): self
    {
        $this->disponible = $disponible;
        return $this;
    }

    public function getDateDisponibilite(): ?\DateTimeInterface
    {
        return $this->dateDisponibilite;
    }

    public function setDateDisponibilite(?\DateTimeInterface $dateDisponibilite): self
    {
        $this->dateDisponibilite = $dateDisponibilite;
        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;
        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;
        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): self
    {
        $this->latitude = $latitude;
        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): self
    {
        $this->longitude = $longitude;
        return $this;
    }

    public function getImages(): ?array
    {
        return $this->images;
    }
    public function setImages(?array $images): self
    {
        $this->images = $images;
        return $this;
    }
}

<?php

namespace App\Entity;

use App\Repository\MaisonLocationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MaisonLocationRepository::class)]
class MaisonLocation
{
    #[Groups(['maison:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['maison:read'])]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['maison:read'])]
    private ?string $adresse = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['maison:read'])]
    private ?string $ville = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['maison:read'])]
    private ?string $codePostal = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 10)]
    #[Groups(['maison:read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Assert\Positive]
    #[Groups(['maison:read'])]
    private ?int $prix = null;

    #[ORM\Column]
    #[Assert\Positive]
    #[Groups(['maison:read'])]
    private ?int $surface = null;

    #[ORM\Column]
    #[Assert\PositiveOrZero]
    #[Groups(['maison:read'])]
    private ?int $nbChambres = null;

    #[ORM\Column(type: "boolean")]
    #[Groups(['maison:read'])]
    private ?bool $disponible = true;

    #[ORM\Column(type: "date")]
    #[Assert\NotNull]
    #[Groups(['maison:read'])]
    private ?\DateTimeInterface $dateDisponibilite = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['maison:read'])]
    private ?string $type = null;

    // Image principale
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['maison:read'])]
    private ?string $image = null;

    // Galerie d'images
    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(['maison:read'])]
    private ?array $images = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['maison:read'])]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['maison:read'])]
    private ?float $longitude = null;

    #[ORM\ManyToOne(inversedBy: "maisons")]
    #[ORM\JoinColumn(nullable: true, onDelete: "SET NULL")]
    #[Groups(['maison:read'])]
    private ?User $proprietaire = null;

    #[ORM\OneToMany(mappedBy: 'maison', targetEntity: DemandeDeVisite::class, cascade: ['remove'])]
    private Collection $demandesDeVisite;

    public function __construct()
    {
        $this->demandesDeVisite = new ArrayCollection();
    }

    public function getId(): ?int { return $this->id; }
    public function getNom(): ?string { return $this->nom; }
    public function setNom(?string $nom): self { $this->nom = $nom; return $this; }

    public function getAdresse(): ?string { return $this->adresse; }
    public function setAdresse(?string $adresse): self { $this->adresse = $adresse; return $this; }

    public function getVille(): ?string { return $this->ville; }
    public function setVille(?string $ville): self { $this->ville = $ville; return $this; }

    public function getCodePostal(): ?string { return $this->codePostal; }
    public function setCodePostal(?string $codePostal): self { $this->codePostal = $codePostal; return $this; }

    public function getDescription(): ?string { return $this->description; }
    public function setDescription(?string $description): self { $this->description = $description; return $this; }

    public function getPrix(): ?int { return $this->prix; }
    public function setPrix(?int $prix): self { $this->prix = $prix; return $this; }

    public function getSurface(): ?int { return $this->surface; }
    public function setSurface(?int $surface): self { $this->surface = $surface; return $this; }

    public function getNbChambres(): ?int { return $this->nbChambres; }
    public function setNbChambres(?int $nbChambres): self { $this->nbChambres = $nbChambres; return $this; }

    public function isDisponible(): ?bool { return $this->disponible; }
    public function setDisponible(?bool $disponible): self { $this->disponible = $disponible; return $this; }

    public function getDateDisponibilite(): ?\DateTimeInterface { return $this->dateDisponibilite; }
    public function setDateDisponibilite(?\DateTimeInterface $dateDisponibilite): self { $this->dateDisponibilite = $dateDisponibilite; return $this; }

    public function getType(): ?string { return $this->type; }
    public function setType(?string $type): self { $this->type = $type; return $this; }

    public function getImage(): ?string { return $this->image; }
    public function setImage(?string $image): self { $this->image = $image; return $this; }

    public function getImages(): ?array { return $this->images; }
    public function setImages(?array $images): self { $this->images = $images; return $this; }

    public function getLatitude(): ?float { return $this->latitude; }
    public function setLatitude(?float $latitude): self { $this->latitude = $latitude; return $this; }

    public function getLongitude(): ?float { return $this->longitude; }
    public function setLongitude(?float $longitude): self { $this->longitude = $longitude; return $this; }

    public function getProprietaire(): ?User { return $this->proprietaire; }
    public function setProprietaire(?User $proprietaire): self { $this->proprietaire = $proprietaire; return $this; }

    public function getDemandesDeVisite(): Collection
    {
        return $this->demandesDeVisite;
    }

    public function addDemandeDeVisite(DemandeDeVisite $demande): self
    {
        if (!$this->demandesDeVisite->contains($demande)) {
            $this->demandesDeVisite[] = $demande;
            $demande->setMaison($this);
        }
        return $this;
    }

    public function removeDemandeDeVisite(DemandeDeVisite $demande): self
    {
        if ($this->demandesDeVisite->removeElement($demande)) {
            if ($demande->getMaison() === $this) {
                $demande->setMaison(null);
            }
        }
        return $this;
    }
}

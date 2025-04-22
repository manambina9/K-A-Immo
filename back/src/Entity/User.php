<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\MaisonLocation;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: 'user')]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var string The user identifier
     */
    #[ORM\Column(length: 255, unique: true)]
    #[Assert\Length(min: 3, max: 255, minMessage: "Le nom d'utilisateur doit comporter au moins {{ limit }} caractères.", maxMessage: "Le nom d'utilisateur ne peut pas dépasser {{ limit }} caractères.")]
    #[Assert\Regex(pattern: '/^[a-zA-Z0-9_]+$/', message: "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et des underscores.")]

    private ?string $Username = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    /**
     * Mot de passe en clair (non persisté)
     */
    #[Assert\NotBlank(message: "Le mot de passe ne peut pas être vide.")]
    #[Assert\Length(min: 8, minMessage: "Le mot de passe doit comporter au moins {{ limit }} caractères.")]
    private ?string $plainPassword = null;

    #[ORM\Column]
    private bool $isVerified = false;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $resetToken = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $resetTokenExpiresAt = null;

    #[ORM\OneToMany(mappedBy: "proprietaire", targetEntity: MaisonLocation::class, orphanRemoval: true, cascade: ['persist'])]
    private Collection $maisons;

    public function __construct()
    {
        $this->roles = [];
        $this->maisons = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;
        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->Username;
    }
    
    public function setUsername(string $Username): static
    {
        $this->Username = $Username;
        return $this;
    }
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function getPasswordField(): ?string
    {
        return $this->Password;
    }

    public function setPasswordField(?string $Password): static
    {
        $this->plainPassword = $Password; // Map automatiquement vers plainPassword
        $this->Password = $Password;
        return $this;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;
        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): static
    {
        $this->plainPassword = $plainPassword;
        return $this;
    }

    public function getResetToken(): ?string
    {
        return $this->resetToken;
    }

    public function setResetToken(?string $resetToken): static
    {
        $this->resetToken = $resetToken;
        return $this;
    }

    public function getResetTokenExpiresAt(): ?\DateTimeInterface
    {
        return $this->resetTokenExpiresAt;
    }

    public function setResetTokenExpiresAt(?\DateTimeInterface $expiresAt): static
    {
        $this->resetTokenExpiresAt = $expiresAt;
        return $this;
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;
        return $this;
    }

    public function eraseCredentials(): void
    {
        // Nettoyage du mot de passe en clair
        $this->plainPassword = null;
    }

        /**
     * @return Collection<int, MaisonLocation>
     */
    public function getMaisons(): Collection
    {
        return $this->maisons;
    }

    public function addMaison(MaisonLocation $maison): static
    {
        if (!$this->maisons->contains($maison)) {
            $this->maisons[] = $maison;
            $maison->setProprietaire($this); // ⚠️ important !
        }

        return $this;
    }

    public function removeMaison(MaisonLocation $maison): static
    {
        if ($this->maisons->removeElement($maison)) {
            // set the owning side to null (unless already changed)
            if ($maison->getProprietaire() === $this) {
                $maison->setProprietaire(null);
            }
        }

        return $this;
    }

}

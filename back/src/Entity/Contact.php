<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
class Contact
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 100)]
    #[Assert\NotBlank(message: 'Le name ne peut pas être vide.')]
    #[Assert\Length(max: 100, maxMessage: 'Le name ne peut pas dépasser {{ limit }} caractères.')]
    private ?string $name = null;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Assert\NotBlank(message: 'L\'email ne peut pas être vide.')]
    #[Assert\Email(message: 'L\'email {{ value }} n\'est pas valide.')]
    private ?string $email = null;

    #[ORM\Column(type: 'string', length: 15, nullable: true)]
    #[Assert\Regex(pattern: '/^\+?[0-9]{9,15}$/', message: 'Le numéro de téléphone n\'est pas valide.')]
    private ?string $phone = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Le sujet est obligatoire.")]
    private $subject;
    
    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: 'Le message ne peut pas être vide.')]
    #[Assert\Length(min: 10, minMessage: 'Le message doit contenir au moins {{ limit }} caractères.')]
    private ?string $message = null;

    #[ORM\Column(type: 'datetime')]
    #[Assert\NotNull]
    private ?\DateTimeInterface $dateEnvoi = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getname(): ?string
    {
        return $this->name;
    }

    public function setname(string $name): self
    {
        $this->name = $name;
        return $this;
    }


    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getphone(): ?string
    {
        return $this->phone;
    }

    public function setphone(?string $phone): self
    {
        $this->phone = $phone;
        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;
        return $this;
    }

    public function getDateEnvoi(): ?\DateTimeInterface
    {
        return $this->dateEnvoi;
    }

    public function setDateEnvoi(\DateTimeInterface $dateEnvoi): self
    {
        $this->dateEnvoi = $dateEnvoi;
        return $this;
    }

    /**
     * Get the value of subject
     */ 
    public function getSubject()
    {
        return $this->subject;
    }

    /**
     * Set the value of subject
     *
     * @return  self
     */ 
    public function setSubject($subject)
    {
        $this->subject = $subject;

        return $this;
    }
}

<?php
namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

class ProfileUpdateRequest
{
    #[Assert\Length(min: 3, max: 255)]
    public ?string $username = null;
    
    #[Assert\Length(max: 20)]
    public ?string $phone = null;
}
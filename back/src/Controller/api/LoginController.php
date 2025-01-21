<?php

namespace App\Controller\api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class LoginController extends AbstractController
{ 
    #[Route("/api/login", name: "api_login", methods: ['POST'])]
    public function ApiLogin(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user instanceof \App\Entity\User) {
            return new JsonResponse(['error' => 'User not authenticated'], 401);
        }
        

        $userData = [
            'email' => $user->getEmail(),
        ];

       return new JsonResponse($userData);
       
    }
}

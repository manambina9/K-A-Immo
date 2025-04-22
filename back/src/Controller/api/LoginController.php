<?php

namespace App\Controller\api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class LoginController extends AbstractController
{ 
    #[Route("/api/login", name: "api_login", methods: ['POST'])]
    public function ApiLogin(Request $request): JsonResponse
    {
        $content = $request->getContent();
        error_log("Données reçues : " . $content);
        
        $data = json_decode($content, true);
        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Format JSON invalide',
                'raw_data' => $content
            ], 400);
        }
        

        // Vérifier l'authentification de l'utilisateur
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        // Retourner les informations de l'utilisateur
        return new JsonResponse([
            'success' => true,
            'user' => [
                //'email' => method_exists($user, 'getEmail') ? $user->getEmail() : 'Email not available',
            ]
        ]);
    }
}

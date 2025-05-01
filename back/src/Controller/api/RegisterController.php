<?php

namespace App\Controller\Api;

use App\Entity\User;
use JMS\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegisterController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
public function register(
    Request $request, 
    UserPasswordHasherInterface $userPasswordHasher,
    EntityManagerInterface $entityManager,
    ValidatorInterface $validator,
    SerializerInterface $serializer
): JsonResponse {
    $data = json_decode($request->getContent(), true);
    
    // Création manuelle de l'utilisateur
    $user = new User();
    $user->setEmail($data['email'] ?? '');
    $user->setUsername($data['username'] ?? '');
    $user->setPlainPassword($data['plainPassword'] ?? '');

    // Validation
    $errors = $validator->validate($user);
    
    if (count($errors) > 0) {
        $errorMessages = [];
        foreach ($errors as $error) {
            $errorMessages[$error->getPropertyPath()] = $error->getMessage();
        }
        return $this->json(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
    }

    // Hachage du mot de passe
    $user->setPassword(
        $userPasswordHasher->hashPassword($user, $user->getPlainPassword())
    );

    $entityManager->persist($user);
    $entityManager->flush();

    return $this->json([
        'message' => 'User registered successfully',
        'user' => [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'username' => $user->getUsername()
        ]
    ], Response::HTTP_CREATED);
}

    /**
     * Helper method to create JSON responses
     */
    private function jsonResponse(
        SerializerInterface $serializer,
        array $data,
        int $status = Response::HTTP_OK,
        array $headers = []
    ): JsonResponse {
        return new JsonResponse(
            $serializer->serialize($data, 'json'),
            $status,
            array_merge(['Content-Type' => 'application/json'], $headers),
            true
        );
    }
}
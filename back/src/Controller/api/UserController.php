<?php
// src/Controller/Api/UserController.php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;

class UserController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator,
        private UserPasswordHasherInterface $passwordHasher
    ) {}
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        $user = $this->getUser();

        if (!$user || !is_object($user)) {
            return new JsonResponse(['error' => 'Invalid credentials'], 401);
        }

        return new JsonResponse([
            'token' => $jwtManager->create($user),
            'user' => $this->formatUser($user),
        ]);
    }

    #[Route('/api/user/me', name: 'api_user_me', methods: ['GET'])]
    public function me(Security $security): JsonResponse
    {
        $user = $security->getUser();

        if (!$user || !is_object($user)) {
            return new JsonResponse(['error' => 'Not authenticated'], 401);
        }

        return new JsonResponse($this->formatUser($user));
    }

    private function formatUser($user): array
    {
        return [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'roles' => $user->getRoles(),
            'phone' => $user->getPhone(),
            'isVerified' => $user->isVerified(),
        ];
    }

#[Route('/api/debug-token', name: 'api_debug_token', methods: ['GET'])]
public function debugToken(Request $request, JWTTokenManagerInterface $jwtManager): JsonResponse
{
    $token = $request->headers->get('Authorization');
    
    if (!$token || !str_starts_with($token, 'Bearer ')) {
        return $this->json(['error' => 'Token missing'], 400);
    }

    $token = substr($token, 7);
    
    try {
        $payload = $jwtManager->parse($token);
        return $this->json([
            'valid' => true,
            'payload' => $payload,
            'user' => $payload['username'] ?? null
        ]);
    } catch (\Exception $e) {
        return $this->json([
            'valid' => false,
            'error' => $e->getMessage()
        ]);
    }
}
    #[Route('/api/user/profile', name: 'api_user_profile', methods: ['GET'])]
public function profile(
    UserRepository $userRepository,
    JWTTokenManagerInterface $jwtManager,
    Request $request
): JsonResponse {
    try {
        $token = str_replace('Bearer ', '', $request->headers->get('Authorization'));
        $payload = $jwtManager->parse($token);
        
        
        $user = $userRepository->findOneBy(['email' => $payload['username']]);

        if (!$user) {
            return $this->json([
                'message' => 'User not found',
                'debug' => [
                    'payload' => $payload,
                    'searched_username' => $payload['username']
                ]
            ], 404);
        }

        return $this->json([
            'user' => $this->serializeUser($user)
        ]);
        
    } catch (\Exception $e) {
        return $this->json([
            'message' => 'Authentication failed',
            'error' => $e->getMessage()
        ], 401);
    }
}
   #[Route('/api/user/profile/update', name: 'api_user_update', methods: ['PUT', 'PATCH'])]
public function updateProfile(
    Request $request,
    JWTTokenManagerInterface $jwtManager,
    UserRepository $userRepository,
    SerializerInterface $serializer,
    ValidatorInterface $validator,
    EntityManagerInterface $em
): JsonResponse {
    try {
        // 1. Vérification du token JWT
        $authHeader = $request->headers->get('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->json(['error' => 'Authorization header missing'], 401);
        }

        $token = str_replace('Bearer ', '', $authHeader);
        $payload = $jwtManager->parse($token);
        
        // 2. Récupération de l'utilisateur
        $user = $userRepository->findOneBy(['email' => $payload['username']]);
        
        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }
        
        // 3. Désérialisation et validation des données
        $data = json_decode($request->getContent(), true);
        
        $serializer->deserialize(
            $request->getContent(),
            User::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $user]
        );

        // 4. Validation des données
        $errors = $validator->validate($user, groups: ['profile_update']);
        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        // 5. Sauvegarde des modifications
        $em->flush();

        // 6. Retour de la réponse
        return $this->json([
            'message' => 'Profile updated successfully',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername(),
                'phone' => $user->getPhone(),
                'isVerified' => $user->isVerified(),
                'roles' => $user->getRoles()
            ]
        ]);

    } catch (JWTDecodeFailureException $e) {
        return $this->json([
            'error' => 'Token invalid',
            'message' => $e->getMessage(),
            'reason' => $e->getReason()
        ], 401);
    } catch (\Exception $e) {
        return $this->json([
            'error' => 'Server error',
            'message' => $e->getMessage()
        ], 500);
    }
}
    #[Route('/api/user/change-password', name: 'api_user_change_password', methods: ['POST'])]
    public function changePassword(
        #[CurrentUser] ?User $user,
        Request $request
    ): JsonResponse {
        if (!$user) {
            return $this->json(['message' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        if (!isset($data['currentPassword']) || !isset($data['newPassword'])) {
            return $this->json(['message' => 'Les champs currentPassword et newPassword sont requis'], Response::HTTP_BAD_REQUEST);
        }

        // Vérification du mot de passe actuel
        if (!$this->passwordHasher->isPasswordValid($user, $data['currentPassword'])) {
            return $this->json(['message' => 'Mot de passe actuel incorrect'], Response::HTTP_UNAUTHORIZED);
        }

        // Hashage et sauvegarde du nouveau mot de passe
        $user->setPassword(
            $this->passwordHasher->hashPassword($user, $data['newPassword'])
        );
        $this->em->flush();

        return $this->json(['message' => 'Mot de passe mis à jour avec succès']);
    }

    #[Route('/api/user/upload-avatar', name: 'api_user_upload_avatar', methods: ['POST'])]
    public function uploadAvatar(
        #[CurrentUser] ?User $user,
        Request $request
    ): JsonResponse {
        if (!$user) {
            return $this->json(['message' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        $uploadedFile = $request->files->get('avatar');
        if (!$uploadedFile) {
            return $this->json(['message' => 'Aucun fichier envoyé'], Response::HTTP_BAD_REQUEST);
        }

        // Ici vous devriez implémenter la logique de stockage du fichier
        // Par exemple avec VichUploaderBundle ou un service custom
        $fileName = 'avatar_'.$user->getId().'.'.$uploadedFile->guessExtension();
        
        // Sauvegarde temporaire - à remplacer par votre logique
        $uploadedFile->move(
            $this->getParameter('avatars_directory'),
            $fileName
        );

        // Mettre à jour l'utilisateur avec le chemin de l'avatar
        // $user->setAvatarPath($fileName);
        $this->em->flush();

        return $this->json([
            'message' => 'Avatar mis à jour avec succès',
            'avatar_url' => '/uploads/avatars/'.$fileName
        ]);
    }

    private function serializeUser(User $user): array
    {
        return [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'phone' => $user->getPhone(),
            'is_verified' => $user->isVerified(),
            'roles' => $user->getRoles()
            // Ajoutez d'autres champs si nécessaire
        ];
    }
}

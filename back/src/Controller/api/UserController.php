<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    
    #[Route('/api/user/update', name: 'api_user_update', methods: ['PUT'])]
    public function updateUser(
        Request $request,
        Security $security,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator
    ): JsonResponse {
        /** @var User|null $user */
        $user = $security->getUser();

        if (!$user instanceof User) {
            return $this->json([
                'status' => 'error',
                'message' => 'Authentication required',
            ], 401);
        }

        $data = json_decode($request->getContent(), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json([
                'status' => 'error',
                'message' => 'Invalid JSON format',
            ], 400);
        }

        try {
            // Update only the fields present
            if (!empty($data['username'])) {
                $user->setUsername(trim($data['username']));
            }

            if (!empty($data['email'])) {
                $user->setEmail(trim($data['email']));
            }

            if (!empty($data['phone'])) {
                $user->setPhone(trim($data['phone']));
            }

            if (!empty($data['password'])) {
                $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
                $user->setPassword($hashedPassword);
            }

            $errors = $validator->validate($user);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getPropertyPath() . ': ' . $error->getMessage();
                }
                return $this->json([
                    'status' => 'error',
                    'errors' => $errorMessages,
                ], 400);
            }

            $entityManager->flush();

            return $this->json([
                'status' => 'success',
                'user' => [
                    'id' => $user->getId(),
                    'username' => $user->getUsername(),
                    'email' => $user->getEmail(),
                    'phone' => $user->getPhone(),
                ],
            ]);
        } catch (\Throwable $e) { // \Throwable est plus large que \Exception
            return $this->json([
                'status' => 'error',
                'message' => 'Server error',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}

<?php

namespace App\Controller\api;

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
    #[Route('/api/register', name: 'api_register')]
    public function register(
        ValidatorInterface $validator,
        SerializerInterface $serializer,
        Request $request, 
        UserPasswordHasherInterface $userPasswordHasher, 
        Security $security, 
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        // Si l'utilisateur est déjà connecté
        if ($this->getUser()) {
            return new JsonResponse(
                $serializer->serialize(['message' => 'Vous devez vous deconnecter avant de continuer'], 'json'),
                Response::HTTP_UNAUTHORIZED,
                [],
                true
            );
        }

        // Désérialiser la requête pour créer un objet User
        $newuser = $serializer->deserialize($request->getContent(), User::class, 'json');

        // Validation des données de l'utilisateur
        $error = $validator->validate($newuser);

        if ($error->count() > 0) {
            return new JsonResponse(
                $serializer->serialize($error, 'json'),
                Response::HTTP_BAD_REQUEST,
                [],
                true
            );
        }

        // Récupérer le mot de passe en clair (plainPassword)
        $getPlainPassword = $newuser->getPlainPassword();

        // Vérifier si le mot de passe est présent
        if (!$getPlainPassword) {
            return new JsonResponse(
                $serializer->serialize(['message' => 'Le mot de passe ne peut pas être vide'], 'json'),
                Response::HTTP_BAD_REQUEST,
                [],
                true
            );
        }

        // Hacher le mot de passe et le définir pour l'utilisateur
        $newuser->setPassword(
            $userPasswordHasher->hashPassword(
                $newuser, // L'objet utilisateur
                $getPlainPassword // Le mot de passe en clair
            )
        );

        // Persist et sauvegarde de l'utilisateur dans la base de données
        $entityManager->persist($newuser);
        $entityManager->flush();

        // Réponse de succès
        return new JsonResponse(
            $serializer->serialize(['message' => 'Votre compte a été créé avec succès'], 'json'),
            Response::HTTP_OK,
            ['accept' => 'application/json'],
            true
        );
    }
}

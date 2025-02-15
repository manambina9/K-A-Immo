<?php

namespace App\Controller\api;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ContactController extends AbstractController
{
    #[Route('/api/contact', name: 'api_contact', methods: ['POST'])]
    public function contact(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $contact = new Contact();
        $contact->setNom($data['nom'] ?? '');
        $contact->setPrenom($data['prenom'] ?? '');
        $contact->setEmail($data['email'] ?? '');
        $contact->setTelephone($data['telephone'] ?? null);
        $contact->setMessage($data['message'] ?? '');
        $contact->setDateEnvoi(new \DateTime()); // Date automatique

        dd($contact);
        // Validation des données
        $errors = $validator->validate($contact);
        if (count($errors) > 0) {
            return $this->json(['error' => (string) $errors], 400);
        }

        // Sauvegarde en base de données
        $entityManager->persist($contact);
        $entityManager->flush();

        return $this->json(['message' => 'Message envoyé avec succès'], 201);
    }
}

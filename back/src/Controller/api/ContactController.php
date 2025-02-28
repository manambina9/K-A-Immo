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
public function submitContactForm(Request $request, EntityManagerInterface $em, ValidatorInterface $validator): JsonResponse
{
    // Vérifie que le contenu de la requête est bien du JSON
    $data = json_decode($request->getContent(), true);

    if ($data === null) {
        return new JsonResponse(['error' => 'Données JSON invalides ou manquantes.'], 400);
    }

    // Vérifie que les champs requis sont présents
    $requiredFields = ['name', 'email', 'subject', 'message'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || $data[$field] === '') {
            return new JsonResponse(['error' => "Le champ '$field' est manquant ou vide."], 400);
        }
    }

    // Crée une nouvelle entité Contact
    $contact = new Contact();
    $contact->setName($data['name']);
    $contact->setEmail($data['email']);
    $contact->setPhone($data['phone'] ?? null); // Le téléphone est optionnel
    $contact->setSubject($data['subject']);
    $contact->setMessage($data['message']);
    $contact->setDateEnvoi(new \DateTime());


    // Validation des données
    $errors = $validator->validate($contact);
    if (count($errors) > 0) {
        $errorMessages = [];
        foreach ($errors as $error) {
            $errorMessages[] = $error->getMessage();
        }
        return new JsonResponse(['error' => $errorMessages], 400);
    }

    // Enregistrement en base de données
    try {
        $em->persist($contact);
        $em->flush();
    } catch (\Exception $e) {
        return new JsonResponse(['error' => 'Une erreur est survenue lors de l\'enregistrement.'], 500);
    }

    return new JsonResponse(['message' => 'Message envoyé avec succès !'], 200);
}
}

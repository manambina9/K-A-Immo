<?php

namespace App\Controller\Api;

use App\Entity\DemandeDeVisite;
use App\Entity\MaisonLocation;
use App\Repository\MaisonLocationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class DemandeDeVisiteController extends AbstractController
{
    #[Route('/api/maisons/{id}/visites', name: 'api_demande_visite', methods: ['POST'])]
    public function demandeVisite(
        Request $request,
        MaisonLocation $maison,
        EntityManagerInterface $em,
        Security $security
    ): JsonResponse {
        $user = $security->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $data = json_decode($request->getContent(), true);
        $message = $data['message'] ?? null;

        $demande = new DemandeDeVisite();
        $demande->setClient($user);
        $demande->setMaison($maison);
        $demande->setDateDemande(new \DateTime());
        $demande->setStatut('en_attente');
        $demande->setMessage($message);

        $em->persist($demande);
        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Demande envoyée avec succès'
        ], 201);
    }
}

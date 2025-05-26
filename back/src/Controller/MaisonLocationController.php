<?php

namespace App\Controller;

use App\Entity\MaisonLocation;
use App\Form\MaisonLocationType;
use App\Repository\MaisonLocationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/maisons')]
class MaisonLocationController extends AbstractController
{
    #[Route('', name: 'app_maison_location_index', methods: ['GET'])]
    public function index(MaisonLocationRepository $repo): Response
    {
        return $this->render('maison_location/index.html.twig', [
            'maison_locations' => $repo->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_maison_location_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $maisonLocation = new MaisonLocation();
        $form = $this->createForm(MaisonLocationType::class, $maisonLocation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($maisonLocation);
            $entityManager->flush();

            return $this->redirectToRoute('app_maison_location_index');
        }

        return $this->render('maison_location/new.html.twig', [
            'maison_location' => $maisonLocation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_maison_location_show', methods: ['GET'])]
    public function show(MaisonLocation $maisonLocation): Response
    {
        return $this->render('maison_location/show.html.twig', [
            'maison_location' => $maisonLocation,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_maison_location_edit', methods: ['GET', 'POST','PUT'])]
    public function edit(Request $request, MaisonLocation $maisonLocation, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(MaisonLocationType::class, $maisonLocation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_maison_location_index');
        }

        return $this->render('maison_location/edit.html.twig', [
            'maison_location' => $maisonLocation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_maison_location_delete', methods: ['POST'])]
    public function delete(Request $request, MaisonLocation $maisonLocation, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $maisonLocation->getId(), $request->request->get('_token'))) {
            $entityManager->remove($maisonLocation);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_maison_location_index');
    }
}

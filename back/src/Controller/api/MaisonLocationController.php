<?php
namespace App\Controller\Api;

use App\Entity\MaisonLocation;
use App\Repository\MaisonLocationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\UserRepository;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/maisons')]
class MaisonLocationController extends AbstractController
{
    #[Route('', name: 'api_maisons_index', methods: ['GET'])]
    public function index(MaisonLocationRepository $repo, Request $request): JsonResponse
    {
        try {
            $maisons = $repo->findAll();
            $baseUrl = $request->getSchemeAndHttpHost();

            if (empty($maisons)) {
                return $this->json(['message' => 'Aucune maison trouvée'], Response::HTTP_OK);
            }

            $data = array_map(function (MaisonLocation $maison) use ($baseUrl) {
                $images = $maison->getImages() ?? [];
                $formattedImages = array_map(function ($image) use ($baseUrl) {
                    if (str_starts_with($image, 'http')) {
                        return $image;
                    }
                    return $baseUrl . '/uploads/proprietaire/' . basename($image);
                }, $images);

                return [
                    'id' => $maison->getId(),
                    'nom' => $maison->getNom(),
                    'description' => $maison->getDescription(),
                    'ville' => $maison->getVille(),
                    'prix' => $maison->getPrix(),
                    'surface' => $maison->getSurface(),
                    'disponible' => $maison->isDisponible(),
                    'nbChambres' => $maison->getNbChambres(),
                    'adresse' => $maison->getAdresse(),
                    'dateDisponibilite' => $maison->getDateDisponibilite()?->format('Y-m-d'),
                    'type' => $maison->getType(),
                    'latitude' => $maison->getLatitude(),
                    'longitude' => $maison->getLongitude(),
                    'imagePrincipale' => $maison->getImage() 
                        ? ($baseUrl . '/uploads/proprietaire/' . basename($maison->getImage()))
                        : null,
                    'images' => $formattedImages,
                    'codePostal' => $maison->getCodePostal()
                ];
            }, $maisons);

            return $this->json($data);

        } catch (\Exception $e) {
            error_log($e->getMessage());
            return $this->json([
                'error' => 'Erreur serveur',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/new', name: 'api_maisons_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $em, UserRepository $userRepo): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], 400);
        }

        $maison = new MaisonLocation();
        $maison->setNom($data['nom'] ?? '');
        $maison->setAdresse($data['adresse'] ?? '');
        $maison->setVille($data['ville'] ?? '');
        $maison->setCodePostal($data['codePostal'] ?? '');
        $maison->setDescription($data['description'] ?? '');
        $maison->setPrix($data['prix'] ?? 0);
        $maison->setSurface($data['surface'] ?? 0);
        $maison->setNbChambres($data['nbChambres'] ?? 1);
        $maison->setDisponible($data['disponible'] ?? true);
        $maison->setDateDisponibilite(new \DateTime($data['dateDisponibilite'] ?? 'now'));
        $maison->setType($data['type'] ?? 'maison');
        $maison->setImages($data['images'] ?? []);

        if (!empty($data['images'])) {
            $maison->setImage($data['images'][0]);
        }

        if (isset($data['proprietaire'])) {
            $userId = is_numeric($data['proprietaire']) ? $data['proprietaire'] : basename($data['proprietaire']);
            $proprietaire = $userRepo->find($userId);
            if ($proprietaire) {
                $maison->setProprietaire($proprietaire);
            }
        }

        $em->persist($maison);
        $em->flush();

        return new JsonResponse([
            'status' => 'success',
            'id' => $maison->getId(),
            'message' => 'Maison ajoutée avec succès',
        ], 201);
    }

    #[Route('/{id}', name: 'api_maisons_show', methods: ['GET'])]
    public function show(MaisonLocation $maison, Request $request): JsonResponse
    {
        $baseUrl = $request->getSchemeAndHttpHost();
        $images = $maison->getImages() ?? [];
        $formattedImages = array_map(function ($image) use ($baseUrl) {
            if (str_starts_with($image, 'http')) {
                return $image;
            }
            return $baseUrl . '/uploads/proprietaire/' . basename($image);
        }, $images);

        return $this->json([
            'id' => $maison->getId(),
            'nom' => $maison->getNom(),
            'adresse' => $maison->getAdresse(),
            'ville' => $maison->getVille(),
            'codePostal' => $maison->getCodePostal(),
            'description' => $maison->getDescription(),
            'prix' => $maison->getPrix(),
            'surface' => $maison->getSurface(),
            'nbChambres' => $maison->getNbChambres(),
            'disponible' => $maison->isDisponible(),
            'dateDisponibilite' => $maison->getDateDisponibilite()?->format('Y-m-d'),
            'type' => $maison->getType(),
            'latitude' => $maison->getLatitude(),
            'longitude' => $maison->getLongitude(),
            'imagePrincipale' => $maison->getImage() 
                ? ($baseUrl . '/uploads/proprietaire/' . basename($maison->getImage()))
                : null,
            'images' => $formattedImages,
            'proprietaire' => $maison->getProprietaire()?->getId(),
        ]);
    }

    #[Route('/{id}', name: 'api_maisons_edit', methods: ['PUT'])]
    public function edit(Request $request, MaisonLocation $maison, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], 400);
        }

        if (isset($data['nom'])) $maison->setNom($data['nom']);
        if (isset($data['adresse'])) $maison->setAdresse($data['adresse']);
        if (isset($data['ville'])) $maison->setVille($data['ville']);
        if (isset($data['codePostal'])) $maison->setCodePostal($data['codePostal']);
        if (isset($data['description'])) $maison->setDescription($data['description']);
        if (isset($data['prix'])) $maison->setPrix($data['prix']);
        if (isset($data['surface'])) $maison->setSurface($data['surface']);
        if (isset($data['nbChambres'])) $maison->setNbChambres($data['nbChambres']);
        if (isset($data['disponible'])) $maison->setDisponible($data['disponible']);
        if (isset($data['dateDisponibilite'])) {
            $maison->setDateDisponibilite(new \DateTime($data['dateDisponibilite']));
        }
        if (isset($data['type'])) $maison->setType($data['type']);
        if (isset($data['images'])) {
            $maison->setImages($data['images']);
            if (!empty($data['images'])) {
                $maison->setImage($data['images'][0]);
            }
        }

        $em->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Maison mise à jour avec succès',
        ]);
    }

    #[Route('/{id}', name: 'api_maisons_delete', methods: ['DELETE'])]
    public function delete(MaisonLocation $maison, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($maison);
        $em->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Maison supprimée avec succès',
        ]);
    }

    #[Route('/upload', name: 'api_maisons_upload', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        /** @var UploadedFile $file */
        $file = $request->files->get('file');

        if (!$file) {
            return $this->json(['error' => 'Aucun fichier reçu'], 400);
        }

        $uploadsDir = $this->getParameter('kernel.project_dir') . '/public/uploads/proprietaire';
        $filename = uniqid() . '.' . $file->guessExtension();

        try {
            $file->move($uploadsDir, $filename);
            return $this->json([
                'url' => '/uploads/proprietaire/' . $filename,
                'filename' => $filename
            ]);
        } catch (FileException $e) {
            return $this->json(['error' => 'Erreur lors de l\'upload'], 500);
        }
    }

    #[Route('/proprietaire/{id}/biens', name: 'api_proprietaire_biens', methods: ['GET'])]
    public function getBiensParProprietaire(
        int $id,
        MaisonLocationRepository $repo,
        Request $request
    ): JsonResponse {
        try {
            $maisons = $repo->findBy(['proprietaire' => $id], ['id' => 'DESC']);
            $baseUrl = $request->getSchemeAndHttpHost();

            if (empty($maisons)) {
                return $this->json(['message' => 'Aucun bien trouvé pour ce propriétaire'], 200);
            }

            $data = array_map(function (MaisonLocation $maison) use ($baseUrl) {
                $images = $maison->getImages() ?? [];
                $formattedImages = array_map(function ($image) use ($baseUrl) {
                    if (str_starts_with($image, 'http')) {
                        return $image;
                    }
                    return $baseUrl . '/uploads/proprietaire/' . basename($image);
                }, $images);

                return [
                    'id' => $maison->getId(),
                    'nom' => $maison->getNom(),
                    'description' => $maison->getDescription(),
                    'ville' => $maison->getVille(),
                    'prix' => $maison->getPrix(),
                    'surface' => $maison->getSurface(),
                    'disponible' => $maison->isDisponible(),
                    'nbChambres' => $maison->getNbChambres(),
                    'adresse' => $maison->getAdresse(),
                    'dateDisponibilite' => $maison->getDateDisponibilite()?->format('Y-m-d'),
                    'type' => $maison->getType(),
                    'codePostal' => $maison->getCodePostal(),
                    'imagePrincipale' => $maison->getImage() 
                        ? ($baseUrl . '/uploads/proprietaire/' . basename($maison->getImage()))
                        : null,
                    'images' => $formattedImages,
                ];
            }, $maisons);

            return $this->json($data);

        } catch (\Exception $e) {
            error_log($e->getMessage());
            return $this->json([
                'error' => 'Erreur serveur',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
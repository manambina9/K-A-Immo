<?php
namespace App\Controller\api;

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

#[Route('/api/maisons')]
class MaisonLocationController extends AbstractController
{
    #[Route('', name: 'api_maisons_index', methods: ['GET'])]
    public function index(MaisonLocationRepository $repo): JsonResponse
    {
        try {
            $maisons = $repo->findAll();
    
            if (empty($maisons)) {
                return $this->json(['message' => 'Aucune maison trouvée'], Response::HTTP_OK);
            }
    
            $data = array_map(function (MaisonLocation $maison) {
                return [
                    'id' => $maison->getId(),
                    'nom' => $maison->getNom(),
                    'description' => $maison->getDescription(),
                    'ville' => $maison->getVille(),
                    'prix' => $maison->getPrix(),
                    'surface' => $maison->getSurface(),
                    'disponible' => $maison->isDisponible(),
                    'chambres' => $maison->getNbChambres(),
                    'adresse' => $maison->getAdresse(),
                    'dateDisponibilite' => $maison->getDateDisponibilite()?->format('Y-m-d'),
                    'type' => $maison->getType(),
                    'latitude' => $maison->getLatitude(),
                    'longitude' => $maison->getLongitude(),
                    'image' => $maison->getImage(),
                    'codePostal' => $maison->getCodePostal()
                ];
            }, $maisons);
    
            return $this->json($data);
    
        } catch (\Exception $e) {
            // Log l'erreur
            error_log($e->getMessage());
            
            return $this->json([
                'error' => 'Erreur serveur',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/new', name: 'api_maison_location_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, UserRepository $userRepository): JsonResponse
    {
        $data = $request->request->all();
        $uploadedFiles = $request->files->all()['images'] ?? [];

        // Validation des champs requis
        $requiredFields = ['nom', 'adresse', 'ville', 'prix', 'codePostal', 'surface', 'nbChambres', 'type'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return new JsonResponse(['error' => "Le champ $field est requis."], Response::HTTP_BAD_REQUEST);
            }
        }

        // Validation des images
        if (count($uploadedFiles) === 0) {
            return new JsonResponse(['error' => 'Au moins une image est requise.'], Response::HTTP_BAD_REQUEST);
        }

        $maisonLocation = new MaisonLocation();
        $maisonLocation->setNom($data['nom']);
        $maisonLocation->setAdresse($data['adresse']);
        $maisonLocation->setVille($data['ville']);
        $maisonLocation->setPrix((int) $data['prix']);
        $maisonLocation->setCodePostal($data['codePostal']);
        $maisonLocation->setDescription($data['description'] ?? '');
        $maisonLocation->setSurface((float) $data['surface']);
        $maisonLocation->setNbChambres((int) $data['nbChambres']);
        $maisonLocation->setLatitude((float) ($data['latitude'] ?? 0));
        $maisonLocation->setLongitude((float) ($data['longitude'] ?? 0));
        $maisonLocation->setType($data['type']);
        $maisonLocation->setDisponible(true);
        $maisonLocation->setDateDisponibilite(new \DateTime());

        // Traitement des images (on prend la première comme image principale)
        $imagePaths = [];
        $destination = $this->getParameter('kernel.project_dir').'/public/Vente/Maison';
        
        foreach ($uploadedFiles as $uploadedFile) {
            if ($uploadedFile instanceof UploadedFile) {
                $newFilename = uniqid().'.'.$uploadedFile->guessExtension();
                
                try {
                    $uploadedFile->move($destination, $newFilename);
                    $imagePaths[] = '/Vente/Maison/'.$newFilename;
                } catch (FileException $e) {
                    // On continue avec les autres images si une échoue
                    continue;
                }
            }
        }

        if (empty($imagePaths)) {
            return new JsonResponse(['error' => 'Erreur lors du téléchargement des images.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // On prend la première image comme image principale
        $maisonLocation->setImage($imagePaths[0]);

        // 🔐 Lier au propriétaire
        if (!empty($data['proprietaire_id'])) {
            $proprietaire = $userRepository->find($data['proprietaire_id']);
            if (!$proprietaire) {
                return new JsonResponse(['error' => 'Utilisateur propriétaire introuvable.'], Response::HTTP_BAD_REQUEST);
            }
            $maisonLocation->setProprietaire($proprietaire);
        }

        $entityManager->persist($maisonLocation);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Maison créée avec succès',
            'id' => $maisonLocation->getId(),
            'images' => $imagePaths
        ], Response::HTTP_CREATED);
    }


    #[Route('/{id}', name: 'api_maison_location_show', methods: ['GET'])]
    public function show(MaisonLocation $maisonLocation): JsonResponse
    {
        return $this->json([
            'id' => $maisonLocation->getId(),
            'nom' => $maisonLocation->getNom(),
            'adresse' => $maisonLocation->getAdresse(),
            'ville' => $maisonLocation->getVille(),
            'codePostal' => $maisonLocation->getCodePostal(),
            'description' => $maisonLocation->getDescription(),
            'prix' => $maisonLocation->getPrix(),
            'surface' => $maisonLocation->getSurface(),
            'nbChambres' => $maisonLocation->getNbChambres(),
            'disponible' => $maisonLocation->isDisponible(),
            'dateDisponibilite' => $maisonLocation->getDateDisponibilite()?->format('Y-m-d'),
            'type' => $maisonLocation->getType(),
            'latitude' => $maisonLocation->getLatitude(),
            'longitude' => $maisonLocation->getLongitude(),
            'image' => $maisonLocation->getImage(),
            'proprietaire' => $maisonLocation->getProprietaire()?->getId(),

        ]);
    }
}

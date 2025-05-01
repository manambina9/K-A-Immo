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
                    'images' => $maison->getImages() ?? [], // Ajoutez ceci
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
    #[Route('/new', name: 'api_maison_location_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $em): JsonResponse
    {
        try {
            // Lire le JSON envoyé
            $data = json_decode($request->getContent(), true);

            if ($data === null) {
                return $this->json([
                    'status' => 'error',
                    'message' => 'JSON invalide'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Vérifier les champs obligatoires
            $requiredFields = ['nom', 'adresse', 'ville', 'prix', 'codePostal', 'surface', 'nbChambres', 'type', 'images'];
            foreach ($requiredFields as $field) {
                if (!isset($data[$field]) || $data[$field] === '') {
                    return $this->json([
                        'status' => 'error',
                        'message' => "Le champ $field est requis"
                    ], Response::HTTP_BAD_REQUEST);
                }
            }

            // Créer la maison
            $maison = new MaisonLocation();
            $maison
                ->setNom($data['nom'])
                ->setAdresse($data['adresse'])
                ->setVille($data['ville'])
                ->setPrix((float) $data['prix'])
                ->setCodePostal($data['codePostal'])
                ->setDescription($data['description'] ?? '')
                ->setSurface((float) $data['surface'])
                ->setNbChambres((int) $data['nbChambres'])
                ->setDisponible($data['disponible'] ?? true)
                ->setDateDisponibilite(isset($data['dateDisponibilite']) ? new \DateTime($data['dateDisponibilite']) : null)
                ->setType($data['type'])
                ->setImage($data['images'][0] ?? null) // Première image
                ->setImages($data['images']);

            $em->persist($maison);
            $em->flush();

            return $this->json([
                'status' => 'success',
                'id' => $maison->getId(),
                'images' => $data['images']
            ]);

        } catch (\Exception $e) {
            error_log('Erreur création maison: ' . $e->getMessage());

            return new JsonResponse([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        
        }
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
            'images' => $maisonLocation->getImages() ?? [], 
            'proprietaire' => $maisonLocation->getProprietaire()?->getId(),
        ]);
    }

    #[Route('/upload', name: 'api_upload', methods: ['POST'])]
public function upload(Request $request): JsonResponse
{
    /** @var UploadedFile $file */
    $file = $request->files->get('file');

    if (!$file) {
        return $this->json(['error' => 'Aucun fichier reçu'], Response::HTTP_BAD_REQUEST);
    }

    // Définir le répertoire d'upload
    $uploadsDir = $this->getParameter('kernel.project_dir') . '/public/uploads';
    $filename = uniqid() . '.' . $file->guessExtension();

    try {
        // Déplacer le fichier dans le répertoire d'upload
        $file->move($uploadsDir, $filename);
    } catch (FileException $e) {
        return $this->json(['error' => 'Erreur lors de l\'upload'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // Retourner l'URL du fichier
    return $this->json(['url' => '/uploads/' . $filename]);
}
}

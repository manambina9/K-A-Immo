<?php
namespace App\Middleware;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class JwtMiddleware
{
    private $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    public function onKernelRequest(RequestEvent $event)
    {
        $request = $event->getRequest();
        
        // Ne s'applique qu'aux routes API
        if (!str_starts_with($request->getPathInfo(), '/api')) {
            return;
        }

        // Exclure la route de login
        if ($request->getPathInfo() === '/api/login') {
            return;
        }

        try {
            // La vérification du token est gérée automatiquement par le bundle JWT
            // Cette partie est juste pour une meilleure gestion des erreurs
            $authHeader = $request->headers->get('Authorization');
            
            if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
                throw new \Exception('Missing or invalid Authorization header');
            }
            
        } catch (\Exception $e) {
            $response = new JsonResponse([
                'error' => 'Authentication failed',
                'message' => $e->getMessage()
            ], 401);
            
            $event->setResponse($response);
        }
    }
}
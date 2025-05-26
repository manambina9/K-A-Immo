<?php 
namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class JWTCreatedSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            'lexik_jwt_authentication.on_jwt_created' => 'onJWTCreated',
        ];
    }

public function onJWTCreated(JWTCreatedEvent $event)
{
    $user = $event->getUser();
    $payload = $event->getData();
    
    // Si vous utilisez email comme identifiant
    $payload['username'] = $user->getEmail();
    // Ou si vous utilisez username
    // $payload['username'] = $user->getUsername();
    
    $event->setData($payload);
}
}
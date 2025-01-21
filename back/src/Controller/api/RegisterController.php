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

         if($this->getUser()){
            return new JsonResponse($serializer->serialize(['message'=>'Vous devez vous deconnecter avant de continuer'],'json'),Response::HTTP_UNAUTHORIZED,[],true);
        }

        $newuser = $serializer->deserialize($request->getContent(), User::class, 'json');

        $error = $validator->validate($newuser);

        if($error->count()>0){
            return new JsonResponse($serializer->serialize($error, 'json'), Response::HTTP_BAD_REQUEST , [] , true);
        }

        $getPassword = $newuser->getPassword(); 
        $getPlainPassword = $newuser->getPlainPassword();

            // encode the plain password
            $newuser->setPassword(
                $userPasswordHasher->hashPassword(
                    $newuser, 
                    $getPassword,
                    $getPlainPassword
                ));
            $entityManager->persist($newuser);
            $entityManager->flush();

            return new JsonResponse($serializer->serialize(['message'=>'votre compte a ete cree avec success'], 'json'), Response::HTTP_OK, ['accept'=> 'application/json'] , true);
    }
}
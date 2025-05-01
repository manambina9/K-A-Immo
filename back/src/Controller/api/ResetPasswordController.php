<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Component\Mime\Address;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api/reset', name: 'api_reset_')]
class ResetPasswordController extends AbstractController
{
    public function __construct(
        private ResetPasswordHelperInterface $resetPasswordHelper,
        private EntityManagerInterface $entityManager
    ) {
    }

    // Route pour la demande de réinitialisation
    #[Route('/request', name: 'forgot_password_request', methods: ['POST'])]
    public function request(Request $request, MailerInterface $mailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email']) || empty($data['email'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Email is required'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $email = $data['email'];

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse(['status' => 'error', 'message' => 'Invalid email format'], JsonResponse::HTTP_BAD_REQUEST);
        }

        return $this->processSendingPasswordResetEmail($email, $mailer);
    }

    // Route pour réinitialiser le mot de passe via un token
    #[Route('/reset/{token}', name: 'password', methods: ['GET', 'POST'])]    
    public function reset(Request $request, UserPasswordHasherInterface $passwordHasher, string $token): Response
    {
        if ($request->isMethod('GET')) {
            // Redirige directement l'utilisateur vers la page de réinitialisation du mot de passe
            return $this->redirect('http://localhost:3000/reset/newpass?token=' . $token);
        }
    
        try {
            /** @var User $user */
            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);
        } catch (ResetPasswordExceptionInterface $e) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Invalid or expired token.',
            ], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        // Vérification du mot de passe
        $data = json_decode($request->getContent(), true);
    
        if (!isset($data['password']) || empty($data['password'])) {
            // Redirection vers la page frontend si le mot de passe est manquant
            return $this->redirect('http://localhost:3000/reset/newpass?token=' . $token);
        }
    
        $plainPassword = $data['password'];
        $user->setPassword($passwordHasher->hashPassword($user, $plainPassword));
        $this->entityManager->flush();
    
        $this->resetPasswordHelper->removeResetRequest($token);
    
        return new JsonResponse([
            'status' => 'success',
            'message' => 'Password reset successfully.',
        ]);
    }
    private function processSendingPasswordResetEmail(string $emailFormData, MailerInterface $mailer): JsonResponse
    {
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $emailFormData]);

        if (!$user) {
            return new JsonResponse([ 'status' => 'success', 'message' => 'If your email exists in our system, you will receive a reset link shortly.' ]);
        }

        try {
            $resetToken = $this->resetPasswordHelper->generateResetToken($user);
        } catch (\Exception $e) {
            return new JsonResponse([ 'status' => 'error', 'message' => 'An unexpected error occurred: ' . $e->getMessage() ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        // Création de l'email
        $email = (new TemplatedEmail())
            ->from(new Address('kellymanambina@gmail.com', 'Reset Password'))
            ->to($user->getEmail())
            ->subject('Your password reset request')
            ->htmlTemplate('reset_password/email.html.twig')
            ->context([
                'resetToken' => $resetToken,
                'frontendUrl' => 'http://localhost:3000/reset/newpass?token=' . $resetToken->getToken(),
            ]);

        // Envoi de l'email
        $mailer->send($email);

        return new JsonResponse([ 'status' => 'success', 'message' => 'If your email exists in our system, you will receive a reset link shortly.' ]);
    }
}

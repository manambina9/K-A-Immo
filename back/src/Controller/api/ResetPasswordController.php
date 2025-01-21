<?php

namespace App\Controller\api;

use App\Entity\User;
use Symfony\Component\Mime\Address;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;

#[Route('/api/reset', name: "api_reset")]
class ResetPasswordController
{
    public function __construct(
        private ResetPasswordHelperInterface $resetPasswordHelper,
        private EntityManagerInterface $entityManager
    ) {
    }

    /**
     * Request a password reset.
     */
    #[Route('/request', name: 'api_forgot_password_request', methods: ['POST'])]
    public function request(Request $request, MailerInterface $mailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email']) || empty($data['email'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Email is required'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $email = $data['email'];

        return $this->processSendingPasswordResetEmail($email, $mailer);
    }

    /**
     * Handle reset password request.
     */
    #[Route('/reset/{token}', name: 'api_reset_password', methods: ['POST'])]
    public function reset(Request $request, UserPasswordHasherInterface $passwordHasher, string $token): JsonResponse
    {
        try {
            /** @var User $user */
            $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);
        } catch (ResetPasswordExceptionInterface $e) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Invalid or expired token.',
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $data = json_decode($request->getContent(), true);

        if (!isset($data['password']) || empty($data['password'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Password is required'], JsonResponse::HTTP_BAD_REQUEST);
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

        // Do not reveal whether a user account was found or not.
        if (!$user) {
            return new JsonResponse([
                'status' => 'success',
                'message' => 'If your email exists in our system, you will receive a reset link shortly.',
            ]);
        }

        try {
            $resetToken = $this->resetPasswordHelper->generateResetToken($user);
        } catch (ResetPasswordExceptionInterface $e) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'An error occurred while processing the reset password request.',
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        $email = (new TemplatedEmail())
            ->from(new Address('kellymanambina@gmail.com', 'Reset Password'))
            ->to($user->getEmail())
            ->subject('Your password reset request')
            ->htmlTemplate('reset_password/email.html.twig')
            ->context(['resetToken' => $resetToken]);

        $mailer->send($email);

        return new JsonResponse([
            'status' => 'success',
            'message' => 'If your email exists in our system, you will receive a reset link shortly.',
        ]);
    }
}

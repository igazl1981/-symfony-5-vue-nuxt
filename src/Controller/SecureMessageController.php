<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class SecureMessageController extends AbstractController {

    public function message(): JsonResponse
    {
        return $this->json([
            'message' => 'Hello World!'
        ]);
    }
}

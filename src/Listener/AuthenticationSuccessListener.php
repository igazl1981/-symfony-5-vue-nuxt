<?php

namespace App\Listener;

use DateInterval;
use DateTime;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;

class AuthenticationSuccessListener
{
    /**
     * @var bool set it to true when we are on PRD
     */
    private $securityCookie = false;

    private $httpOnlyCookie = true;

    private $tokenTtl;

    /**
     * AuthenticationSuccessListener constructor.
     * @param int $tokenTtl TTL value from the Lexik configuration
     * @param string $environment the env of the service
     */
    public function __construct(int $tokenTtl, string $environment)
    {
        $this->tokenTtl = $tokenTtl;
        $this->securityCookie = $environment == 'prod';
    }

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event)
    {
        $response = $event->getResponse();
        $data = $event->getData();
        $token = $data['token'];

        // unset token to remove from the response
        unset($data['token']);
        $event->setData($data);

        $expirationTime = new DateTime();
        $expirationTime->add(
            new DateInterval('PT' . $this->tokenTtl . 'S')
        );

        $response->headers->setCookie(
            new Cookie('BEARER', $token,
                $expirationTime,
                '/',
                null,
                $this->securityCookie,
                $this->httpOnlyCookie)
        );

    }
}

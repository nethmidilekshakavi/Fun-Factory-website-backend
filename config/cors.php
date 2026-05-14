<?php

/*
|--------------------------------------------------------------------------
| Fun Factory — CORS Config
| File: config/cors.php
|--------------------------------------------------------------------------
| React admin panel (localhost:3000) ← → Laravel API (localhost:8000)
| CORS allow karanawa
*/

return [
    'paths'                    => ['api/*'],
    'allowed_methods'          => ['*'],
    'allowed_origins'          => ['*'],   // Production ē specific domain denna: ['http://yourdomain.com']
    'allowed_origins_patterns' => [],
    'allowed_headers'          => ['*'],
    'exposed_headers'          => [],
    'max_age'                  => 0,
    'supports_credentials'     => false,
];

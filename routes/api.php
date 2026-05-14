<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CmsDataController; // ✅ FIX: CmsController → CmsDataController

/*
|--------------------------------------------------------------------------
| Fun Factory CMS — API Routes
| File: routes/api.php
|--------------------------------------------------------------------------
*/

// NOTE: web.php ේ /api/cms/* routes define කරලා තියෙනවා.
// ඒ නිසා api.php ේ duplicate routes හදන්න එපා.
// web.php ේ routes use කරන්නෙ — මේ file blank රාකන්න හෝ
// api.php prefix use කරන්නෙ නැතිව routes define කරන්නෙ නැතිව.

// If you want to use api.php instead, uncomment below and remove from web.php:
// Route::prefix('cms')->group(function () {
//     Route::get('/all',         [CmsDataController::class, 'show']);
//     Route::post('/save',       [CmsDataController::class, 'store']);
//     Route::post('/ai-edit',    [CmsDataController::class, 'aiEdit']);
// });

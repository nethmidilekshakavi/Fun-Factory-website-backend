<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CmsDataController;

Route::get('/', function () {
    return view('welcome');
});

// CMS Admin view
Route::get('/admin/cms', function () {
    return view('cms');
});

// ── CMS API Routes ──
Route::prefix('api/cms')->group(function () {
    Route::get('/all',          [CmsDataController::class, 'show']);
    Route::post('/save',        [CmsDataController::class, 'store']);
    Route::post('/ai-edit',     [CmsDataController::class, 'aiEdit']);
    Route::post('/upload-logo', [CmsDataController::class, 'uploadLogo']); // ← NEW: logo upload
});

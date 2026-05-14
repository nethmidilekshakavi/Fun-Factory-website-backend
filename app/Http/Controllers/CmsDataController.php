<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class CmsDataController extends Controller
{
    // ── GET /api/cms/all ─────────────────────────────────────────
    public function show()
    {
        $rows   = DB::table('cms_settings')->get();
        $result = [];

        foreach ($rows as $row) {
            $decoded = json_decode($row->section_data, true) ?? [];

            // navbar row eke logo_path column eka logoSrc lesa inject karanawa
            if ($row->section_key === 'navbar' && !empty($row->logo_path)) {
                $decoded['logoSrc'] = $row->logo_path;
            }

            $result[$row->section_key] = $decoded;
        }

        return response()->json($result);
    }

    // ── POST /api/cms/save ───────────────────────────────────────
    public function store(Request $request)
    {
        $data = $request->all();

        foreach ($data as $key => $value) {
            DB::table('cms_settings')->updateOrInsert(
                ['section_key' => $key],
                ['section_data' => json_encode($value), 'updated_at' => now()]
            );
        }

        return response()->json(['success' => true]);
    }

    // ── POST /api/cms/ai-edit ────────────────────────────────────
    // Anthropic API proxy — API key React ke expose nokara Laravel haraha call karanawa
    public function aiEdit(Request $request)
    {
        $messages = $request->input('messages', []);
        $apiKey   = env('ANTHROPIC_API_KEY');

        if (!$apiKey) {
            return response()->json(['error' => 'ANTHROPIC_API_KEY not set in .env'], 500);
        }

        $response = Http::withHeaders([
            'x-api-key'         => $apiKey,
            'anthropic-version' => '2023-06-01',
            'Content-Type'      => 'application/json',
        ])->post('https://api.anthropic.com/v1/messages', [
            'model'      => 'claude-sonnet-4-20250514',
            'max_tokens' => 1000,
            'messages'   => $messages,
        ]);

        return response()->json($response->json());
    }

    // ── POST /api/cms/upload-logo ────────────────────────────────
    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,jpg,png,gif,svg,webp|max:2048',
        ]);

        $file     = $request->file('logo');
        $filename = 'logo_' . time() . '.' . $file->getClientOriginalExtension();

        $file->move(public_path('images'), $filename);
        $fullUrl = asset('images/' . $filename);

        // DB logo_path column ektata full URL save karanawa
        DB::table('cms_settings')->updateOrInsert(
            ['section_key' => 'navbar'],
            ['logo_path' => $fullUrl, 'updated_at' => now()]
        );

        return response()->json([
            'success' => true,
            'path'    => $fullUrl,
            'url'     => $fullUrl,
        ]);
    }

    // ── POST /api/cms/upload-hero-image ──────────────────────────
    // Single hero image upload — path return karanawa, React ke sliderImages[i] ektata set wenawa
    public function uploadHeroImage(Request $request)
    {
        $request->validate([
            'hero_image' => 'required|image|mimes:jpeg,jpg,png,gif,webp|max:5120',
        ]);

        $file     = $request->file('hero_image');
        $filename = 'hero_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

        $file->move(public_path('images'), $filename);
        $fullUrl = asset('images/' . $filename);

        // NOTE: sliderImages array eka React state eke manage wenawa.
        // Save button press karaddi store() method hara DB ektata persist wenawa.
        // Meka path mathraka return karanawa — React state update karanawa.

        return response()->json([
            'success' => true,
            'path'    => $fullUrl,
            'url'     => $fullUrl,
        ]);
    }

    // ── DELETE /api/cms/delete-hero-image ────────────────────────
    // Optional: Server eke file delete karanawa (DB update React ke save() hara wenawa)
    public function deleteHeroImage(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        $path     = $request->input('path');
        $filename = basename($path);

        // Security: only delete files inside public/images/
        $fullPath = public_path('images/' . $filename);

        if (file_exists($fullPath) && str_starts_with(realpath($fullPath), realpath(public_path('images')))) {
            unlink($fullPath);
        }

        return response()->json(['success' => true]);
    }
}

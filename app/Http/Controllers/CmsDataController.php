<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class CmsDataController extends Controller
{
    public function show()
    {
        $rows = DB::table('cms_settings')->get();
        $result = [];
        foreach ($rows as $row) {
            $decoded = json_decode($row->section_data, true) ?? [];

            // navbar row එකේ logo_path column එක logoSrc ලෙස inject කරනවා
            if ($row->section_key === 'navbar' && !empty($row->logo_path)) {
                $decoded['logoSrc'] = $row->logo_path;
            }

            $result[$row->section_key] = $decoded;
        }
        return response()->json($result);
    }

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

    // Anthropic API proxy — API key React කෙේ expose නොකර Laravel හරහා call කරනවා
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

    // Logo image upload — public/images/ folder එකට save + DB logo_path column update
    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,jpg,png,gif,svg,webp|max:2048',
        ]);

        $file     = $request->file('logo');
        $filename = 'logo_' . time() . '.' . $file->getClientOriginalExtension();
        $path     = 'images/' . $filename;

        // 1. public/images/ folder එකට file save කරනවා
        $file->move(public_path('images'), $filename);

        // 2. asset() use කරනවා — APP_URL .env එකෙන් auto pick කරනවා
        //    local:      http://localhost:8000/images/logo_xxx.png
        //    production: https://yourdomain.com/images/logo_xxx.png
        $fullUrl = asset($path);

        // 3. DB logo_path column එකට full URL save කරනවා
        DB::table('cms_settings')->updateOrInsert(
            ['section_key' => 'navbar'],
            ['logo_path' => $fullUrl, 'updated_at' => now()]
        );

        return response()->json([
            'success' => true,
            'path'    => $fullUrl,   // React කෙේ logoSrc එකට full URL set වෙනවා
            'url'     => $fullUrl,
        ]);
    }
}

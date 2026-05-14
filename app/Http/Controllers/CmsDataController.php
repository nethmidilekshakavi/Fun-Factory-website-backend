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
            $result[$row->section_key] = json_decode($row->section_data, true);
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

    // ✅ FIX: AI edit — Anthropic API proxy
    // React ෙකේ API key expose නොකර Laravel ෙකේ හරහා call කරනවා
    public function aiEdit(Request $request)
    {
        $messages  = $request->input('messages', []);
        $apiKey    = env('ANTHROPIC_API_KEY');

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
}

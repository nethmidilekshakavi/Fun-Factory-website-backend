<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| Fun Factory CMS — Default Data Seeder
| File: database/seeders/CmsSettingsSeeder.php
|--------------------------------------------------------------------------
| Run: php artisan db:seed --class=CmsSettingsSeeder
*/

class CmsSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [

            'topBanner' => [
                'emoji'     => '🎉',
                'text'      => 'NOW OPEN at 2 locations!',
                'location1' => 'Nawala',
                'location2' => 'Mount Lavinia',
                'suffix'    => 'Birthday parties available 7 days a week! 🎈',
            ],

            'navbar' => [
                'links' => [
                    ['label' => 'Home',           'href' => 'index.html'],
                    ['label' => 'About Us',        'href' => 'about.html'],
                    ['label' => 'Facilities',      'href' => '#Facilities'],
                    ['label' => 'Services',        'href' => '#services-section'],
                    ['label' => 'Party Packages',  'href' => 'party-packages.html'],
                    ['label' => 'Membership',      'href' => '#'],
                    ['label' => 'Photo Album',     'href' => '#ff-gallery'],
                    ['label' => 'Contact Us',      'href' => 'contact-Us.html'],
                ],
                'ctaLabel' => 'Book Now',
                'ctaHref'  => '#',
            ],

            'hero' => [
                'line1'       => 'Where Kids',
                'line2'       => 'Play, Laugh',
                'line3'       => '& Grow!',
                'subtitle'    => 'The Ultimate Kids Venue',
                'description' => "Fun Factory is Sri Lanka's first supervised, totally air-conditioned, indoor playground for children ages 0 to 11 years. Jungle gym, toddler zones, library & activity areas, café, and so much more — all under one roof!",
                'cta1'        => '🎂 Book a Party',
                'cta2'        => 'Explore Attractions →',
            ],

            'stats' => [
                ['number' => '10+',  'label' => 'Attractions'],
                ['number' => '2',    'label' => 'Locations'],
                ['number' => '0–11', 'label' => 'Age Range'],
                ['number' => '7',    'label' => 'Days a Week'],
            ],

            'features' => [
                ['icon' => '🛝', 'title' => 'Safe Play Zones',     'subtitle' => 'Designed for every age'],
                ['icon' => '🎂', 'title' => 'Birthday Parties',    'subtitle' => 'Unforgettable celebrations'],
                ['icon' => '🎨', 'title' => 'Creative Activities', 'subtitle' => 'Art, crafts & more'],
                ['icon' => '🏆', 'title' => '#1 in Sri Lanka',     'subtitle' => 'First & finest since day one'],
            ],

            'locations' => [
                [
                    'name'    => 'Nawala Branch',
                    'address' => '573, Nawala Road, Rajagiriya',
                    'phone1'  => '011 286 2656',
                    'phone2'  => '077 360 3777',
                ],
                [
                    'name'    => 'Mount Lavinia Branch',
                    'address' => '3rd Floor, Mount City Building, Galle Road',
                    'phone1'  => '011 588 2656',
                    'phone2'  => '077 360 3777',
                ],
            ],

            'footer' => [
                'copyright' => '© 2025 Fun Factory — All Rights Reserved. Website by Ribelz.',
                'tagline'   => 'Made for kids, by people who love them',
            ],
        ];

        foreach ($defaults as $key => $value) {
            DB::table('cms_settings')->updateOrInsert(
                ['section_key' => $key],
                ['section_data' => json_encode($value), 'updated_at' => now(), 'created_at' => now()]
            );
        }

        $this->command->info('✅ Fun Factory CMS default data seeded!');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/*
|--------------------------------------------------------------------------
| Fun Factory CMS — CmsSetting Model
| File: app/Models/CmsSetting.php
|--------------------------------------------------------------------------
*/

class CmsSetting extends Model
{
    protected $table    = 'cms_settings';
    protected $fillable = ['section_key', 'section_data'];
}

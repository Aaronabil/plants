<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'category_name',
        'slug',
        'description',
        'image_url',
    ];

    public function children(){
        return $this->hasMany(Category::class, 'parent_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'project_session_id',
        'title', 
        'project_description',
        'project_steps',
        'project_requirements',
        'project_tips',
        'project_applications',
        'is_bookmarked',
        'is_recommended'
    ];

    public function projectSession()
    {
        return $this->belongsTo(ProjectSession::class, 'project_session_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

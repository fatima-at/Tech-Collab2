<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'include_cv',
        'complexity_level',
        'duration',
        'team_size',
        'expected_outcome',
    ];

    public function focusAreas()
    {
        return $this->hasMany(FocusArea::class);
    }

    public function toolsAndTechnologies()
    {
        return $this->hasMany(ToolsAndTechnologies::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'project_session_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

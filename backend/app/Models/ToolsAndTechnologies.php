<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToolsAndTechnologies extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_session_id',
        'name',
    ];

    public function projectSession()
    {
        return $this->belongsTo(ProjectSession::class);
    }
}

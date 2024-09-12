<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectCollection extends Model
{
    protected $table = 'projects_collection';

    protected $fillable = [
        'vector_id', 'title', 'description', 'category', 'required_skills', 'proposed_algorithms', 'URL'
    ];

    /**
     * Automatically cast `required_skills` and `proposed_algorithms`
     * as arrays when accessing them and as JSON strings when storing them.
     */
    protected $casts = [
        'required_skills' => 'string',
        'proposed_algorithms' => 'string',
    ];

    /**
     * Get the `required_skills` attribute.
     * Decode the JSON string to an array when retrieving from the database.
     */
    public function getRequiredSkillsAttribute($value)
    {
        return json_decode($value, true);
    }

    /**
     * Set the `required_skills` attribute.
     * Encode the array as a JSON string before saving to the database.
     */
    public function setRequiredSkillsAttribute($value)
    {
        $this->attributes['required_skills'] = json_encode($value);
    }

    /**
     * Get the `proposed_algorithms` attribute.
     * Decode the JSON string to an array when retrieving from the database.
     */
    public function getProposedAlgorithmsAttribute($value)
    {
        return json_decode($value, true);
    }

    /**
     * Set the `proposed_algorithms` attribute.
     * Encode the array as a JSON string before saving to the database.
     */
    public function setProposedAlgorithmsAttribute($value)
    {
        $this->attributes['proposed_algorithms'] = json_encode($value);
    }
}

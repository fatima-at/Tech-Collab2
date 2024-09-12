<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectCollection;

class ProjectCollectionController extends Controller
{
    public function getPaginatedProjects(Request $request)
    {
        // Get categories and search query from the request
        $categories = $request->input('categories', []);
        $searchQuery = $request->input('search_value', ''); // Default to empty string if not provided
    
        // Get page number from the query string
        $page = $request->query('page', 1);
    
        // Pagination settings
        $chunkSize = 24;
        
        // Query the projects
        $query = ProjectCollection::query();
    
        // Apply search filter if search query is provided
        if (!empty($searchQuery)) {
            $query->where('title', 'like', '%' . $searchQuery . '%'); // Search in the project title
        }
    
        // If categories is not "All", apply the filter
        if (!empty($categories) && !in_array("All", $categories)) {
            $query->whereIn('category', $categories);  // Filter by categories
        }
    
        // Get paginated results
        $projects = $query->paginate($chunkSize, ['*'], 'page', $page);
    
        return response()->json([
            'status' => true,
            'message' => 'Paginated projects retrieved successfully.',
            'data' => $projects,
        ], 200);
    }    

    public function getAllCategories()
    {
        // Retrieve all unique categories from the projects_collection
        $categories = ProjectCollection::distinct()->pluck('category');

        return response()->json([
            'status' => true,
            'message' => 'Categories retrieved successfully.',
            'categories' => $categories
        ]);
    }
}

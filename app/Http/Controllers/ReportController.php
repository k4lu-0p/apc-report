<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Report as ReportResource;

class ReportController extends Controller
{
    public function index(Request $request) {
        return ReportResource::collection($request->user()->reports);
    }
}

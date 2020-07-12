<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\User;

class UserController extends Controller
{
    public function index() {
        return UserResource::collection(User::all());
    }
}

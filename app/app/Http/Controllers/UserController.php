<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetUsersRequest;
use App\Services\UserService;

class UserController extends Controller
{
    public function index(GetUsersRequest $request, UserService $userService) {
        $userService->setUserRequest($request);
        return $userService->handleFilteredRequest();
    }

    public function show(UserService $userService, $id)
    {
        return $userService->getById($id);
    }
}

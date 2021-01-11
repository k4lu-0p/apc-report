<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostNewsletterRequest;
use App\Services\NewsletterService;

class NewsletterController extends Controller
{
    public function publish(NewsletterService $newsletterService, PostNewsletterRequest $request) {
        $newsletterService->setUserRequest($request);
        return $newsletterService->publishToAllCustomers();
    }
}

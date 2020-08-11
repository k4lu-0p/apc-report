<?php

namespace App\Http\Middleware;

use Closure;

class TokenAbilitiesCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$abilities)
    {
        foreach ($abilities as $ability) {
            if (!$request->user()->tokenCan($ability)) {
                abort(400, 'Access denied');
            }
        }

        return $next($request);
    }
}

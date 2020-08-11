<?php

namespace App\Http\Middleware;
use App\Role\RoleChecker;

use Closure;
use Illuminate\Auth\Access\AuthorizationException;

/**
 * Class UserRoleCheck
 * @package App\Http\Middleware
 */
class UserRoleCheck
{
    /**
     * @var RoleChecker
     */
    protected $roleChecker;

    public function __construct(RoleChecker $roleChecker)
    {
        $this->roleChecker = $roleChecker;
    }

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @param string $role
     * @return mixed
     * @throws AuthorizationException
     */
    public function handle($request, Closure $next, $role)
    {
        $user = $request->user();

        if (!$this->roleChecker->check($user, $role)) {
            throw new AuthorizationException('Permission Denied.');
        }

        return $next($request);
    }
}

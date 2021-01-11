<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class StatsServiceProvider extends ServiceProvider {
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

     /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        return app(StatsService::class);
    }
}

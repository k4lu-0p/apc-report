<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppointmentServiceProvider extends ServiceProvider {
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
        return app(AppointmentService::class);
    }
}

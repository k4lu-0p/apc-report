<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $guarded = [];

    public function reports() {
        return $this->hasMany('App\Report');
    }

    public function appointments() {
        return $this->hasMany('App\Appointment');
    }
}

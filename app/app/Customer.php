<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    public function reports() {
        return $this->hasMany('App\Report');
    }

    public function appointments() {
        return $this->hasMany('App\Appointment');
    }
}

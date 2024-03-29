<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $guarded = [];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function customer() {
        return $this->belongsTo('App\Customer');
    }

    public function appointment() {
        return $this->belongsTo('App\Appointment');
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'commercial_name' => $this->commercial_name,
            'leader_lastname' => $this->leader_lastname,
            'leader_firstname' => $this->leader_firstname,
            'address' => $this->address,
            'email' => $this->email,
            'phone' => $this->phone,
        ];
    }
}

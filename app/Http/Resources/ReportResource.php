<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
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
            // 'user' => new UserResource($this->user),
            'customer' => new CustomerResource($this->customer),
            'survey' => $this->survey,
            'created_at' => $this->created_at,
        ];
    }
}

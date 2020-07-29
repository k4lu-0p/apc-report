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
            'is_complete' => $this->is_complete,
            'customer_name' => $this->customer->name,
            'appointment_start_at' => $this->appointment->start_at,
            'appointment_finish_at' => $this->appointment->finish_at,
            'responses' => $this->responses,
            'created_at' => $this->created_at,
        ];
    }
}

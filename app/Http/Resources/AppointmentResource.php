<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
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
            'report' => new ReportResource($this->report),
            'title' => $this->title,
            'location' => $this->location,
            'warning' => $this->warning,
            'start_at' => $this->start_at,
            'finish_at' => $this->finish_at,
            'created_at' => $this->created_at,
        ];
    }
}

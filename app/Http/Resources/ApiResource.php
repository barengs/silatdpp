<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApiResource extends JsonResource
{
    /** public property */
    public $message;
    public $status;
    public $resource;
    
    /**
     * Method __construct
     *
     * @param mixed $status [explicite description]
     * @param mixed $message [explicite description]
     * @param mixed $resource [explicite description]
     *
     * @return void
     */
    public function __construct($status, $message, $resource)
    {
        parent::__construct($resource);

        $this->status = $status;
        $this->message = $message;
    }

    /**
     * Method toArray
     *
     * @param mixed $request [explicite description]
     *
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'success'   => $this->status,
            'message'   => $this->message,
            'data'      => $this->resource,
        ];
    }
}

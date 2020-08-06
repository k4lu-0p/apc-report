<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Http\Requests\GetCustomersRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Services\CustomerService;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(GetCustomersRequest $request, CustomerService $customerService)
    {
        $customerService->setUserRequest($request);
        return $customerService->handleFilteredRequest();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(CustomerService $customerService, $id)
    {
        return $customerService->getById($id);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update($id, CustomerService $customerService, UpdateCustomerRequest $request)
    {
        $customerService->setUserRequest($request);
        return $customerService->updateById($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(CustomerService $customerService, $id)
    {
        return $customerService->deleteById($id);
    }
}

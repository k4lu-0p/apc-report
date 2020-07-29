<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetReportsRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Report;
use App\Services\ReportService;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(GetReportsRequest $request, ReportService $reportService)
    {
        $reportService->setUserRequest($request);
        return $reportService->handleFilteredRequest();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function show($id, ReportService $reportService)
    {
        return $reportService->getById($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  integer  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, ReportService $reportService, UpdateReportRequest $request)
    {
        $reportService->setUserRequest($request);
        return $reportService->updateById($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function destroy(Report $report)
    {
        //
    }
}

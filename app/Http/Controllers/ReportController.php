<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetReportsRequest;
use App\Http\Requests\UpdateReport;
use Illuminate\Http\Request;
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
    public function show(ReportService $reportService, $id)
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
    public function update(UpdateReport $request, $id)
    {
        $report = Report::find($id);

        $report->is_complete = true;
        $report->responses = $request->responses;

        $report->save();

        // succes response with report updated
        return response()->reportUpdated($report);
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

<?php

use Illuminate\Database\Seeder;
use App\Setting;
use App\Services\ReportSurveyService;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(ReportSurveyService $reportSurveyService)
    {
        return Setting::create([
            'key' => 'survey',
            'content' => $reportSurveyService->getSurveyStringify(),
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;
use App\Setting;
use App\Services\SurveyService;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(SurveyService $surveyService)
    {
        return Setting::create([
            'key' => 'survey',
            'content' => $surveyService->getSurveyStringify(),
        ]);
    }
}

"use client";
import { saveAs } from "file-saver";
import { Button } from "@/app/General/muiComponents";
import { useSelector } from "react-redux";

import { DownloadBtnProps } from "@/app/General/interfaces";

import {
    BLOB_TYPE,
    DOWNLOAD_BTN_TEXT,
    DOWNLOAD_BTN_COLOR,
    DOWNLOAD_BTN_VARIANT,
    DOWNLOAD_BTN_EMPTY_STR,
} from "@/app/General/Resources/WizardMainRes";

function DownloadBtn({ fileName = DOWNLOAD_BTN_EMPTY_STR }: DownloadBtnProps) {
    const surveyParams = useSelector((state: any) => state.multiChoice);
    const fileContents = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>JSPsych</title>
            <script src="https://unpkg.com/jspsych@7.3.3"></script>
            <script src="https://unpkg.com/@jspsych/plugin-survey-multi-choice@1.1.2"></script>
            <link href="https://unpkg.com/jspsych@7.3.3/css/jspsych.css" rel="stylesheet" type="text/css" />
          </head>
        </head>
        <body></body>
        <script>
        const jsPsych = initJsPsych();
        const timeline = [];

        const trial = {
            type: jsPsychSurveyMultiChoice,
            questions: [
              {
                prompt: "${surveyParams[0].promptQ}", 
                name: "${surveyParams[0].nameQ}", 
                options: [${surveyParams[0].optionsQ}], 
                required: ${surveyParams[0].required},
                horizontal: ${surveyParams[0].horizontal},
              }, 
            ],
          };

        timeline.push(trial);
    
        jsPsych.run(timeline);
        </script>
    </html>

        `;

    const downloadFile = () => {
        const blob = new Blob([fileContents], {
            type: BLOB_TYPE,
        });
        saveAs(blob, `${fileName}.html`);
    };

    return (
        <Button
            variant={DOWNLOAD_BTN_VARIANT}
            color={DOWNLOAD_BTN_COLOR}
            onClick={downloadFile}
        >
            {DOWNLOAD_BTN_TEXT}
        </Button>
    );
}

export default DownloadBtn;

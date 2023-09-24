"use client";
import { saveAs } from "file-saver";
import { Button } from "@/app/General/muiComponents";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { replaceFirstAndLast } from "@/app/General/utils";
import ErrorStep from "@/app/Components/Wizard/Main/ErrorStep";
import {
    DownloadBtnProps,
    MultiChoiceQuestion,
    LikertQuestion,
} from "@/app/General/interfaces";
import {
    BLOB_TYPE,
    DOWNLOAD_BTN_TEXT,
    DOWNLOAD_BTN_COLOR,
    DOWNLOAD_BTN_VARIANT,
    DOWNLOAD_BTN_EMPTY_STR,
    STYPE_LIKERT,
    STYPE_MULTI_CHOICE,
    ERR_MSG_STYPE,
} from "@/app/General/Resources/WizardMainRes";

function DownloadBtn({
    fileName = DOWNLOAD_BTN_EMPTY_STR,
    errorHandler = () => null,
}: DownloadBtnProps) {
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );
    const surveyParams = useSelector((state: RootState) => {
        if (surveyType === STYPE_MULTI_CHOICE) {
            return state.multiChoice;
        } else if (surveyType === STYPE_LIKERT) {
            return state.likert;
        } else {
            errorHandler(ERR_MSG_STYPE);
        }
    });

    let trial: string = DOWNLOAD_BTN_EMPTY_STR;
    if (surveyType === STYPE_MULTI_CHOICE) {
        const params = surveyParams as MultiChoiceQuestion[];
        trial = `
      const trial = {
          type: jsPsychSurveyMultiChoice,
          questions: [
            {
              prompt: "${params[0].promptQ}", 
              name: "${params[0].nameQ}", 
              options: [${params[0].optionsQ}], 
              required: ${params[0].required},
              horizontal: ${params[0].horizontal},
            }, 
          ],
        };
      `;
    } else if (surveyType === STYPE_LIKERT) {
        const params = surveyParams as LikertQuestion[];
        const questions = params[0].promptQ.map((prompt, index) => {
            return `{prompt: "${replaceFirstAndLast(
                prompt,
                DOWNLOAD_BTN_EMPTY_STR,
                DOWNLOAD_BTN_EMPTY_STR
            )}", name: "${replaceFirstAndLast(
                params[0].nameQ[index],
                DOWNLOAD_BTN_EMPTY_STR,
                DOWNLOAD_BTN_EMPTY_STR
            )}", labels: labels}`;
        });

        const replacedLabels = params[0].optionsQ.map((option) => {
            const replacedOption = replaceFirstAndLast(
                option,
                DOWNLOAD_BTN_EMPTY_STR,
                DOWNLOAD_BTN_EMPTY_STR
            );
            return `'<p style="margin:30px">${replacedOption}</p>'`;
        });

        trial = `
        const labels = [${replacedLabels}];
      const trial = {
          type: jsPsychSurveyLikert,
          questions: [
            ${questions} 
          ],
          randomize_question_order: ${params[0].randomQ},
        };
      `;
    } else {
        errorHandler(ERR_MSG_STYPE);
    }

    const fileContents = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>JSPsych</title>
            <script src="https://unpkg.com/jspsych@7.3.3"></script>
            <script src="https://unpkg.com/@jspsych/plugin-survey-multi-choice@1.1.2"></script>
            <script src="https://unpkg.com/@jspsych/plugin-survey-likert@1.1.2"></script>
            <script src="https://unpkg.com/@jspsych/plugin-survey-text@1.1.2"></script>
            <script src="https://unpkg.com/@jspsych/plugin-survey-multi-select@1.1.2"></script>
            <link href="https://unpkg.com/jspsych@7.3.3/css/jspsych.css" rel="stylesheet" type="text/css" />
          </head>
        </head>
        <body></body>
        <script>
        const jsPsych = initJsPsych();
        const timeline = [];

        ${trial}

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

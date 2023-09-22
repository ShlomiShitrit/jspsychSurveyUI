"use client";
import { saveAs } from "file-saver";
import { Button } from "@/app/General/muiComponents";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { replaceFirstAndLast } from "@/app/General/utils";
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
} from "@/app/General/Resources/WizardMainRes";

function DownloadBtn({ fileName = DOWNLOAD_BTN_EMPTY_STR }: DownloadBtnProps) {
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );

    // TODO: move to resources
    const surveyParams = useSelector((state: RootState) => {
        if (surveyType === "Multi Choice") {
            return state.multiChoice;
        } else if (surveyType === "Likert") {
            return state.likert;
        } else {
            throw new Error("Invalid survey type");
        }
    });

    // TODO: move to resources
    let trial: string = "";
    if (surveyType === "Multi Choice") {
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
    } else if (surveyType === "Likert") {
        const params = surveyParams as LikertQuestion[];
        const questions = params[0].promptQ.map((prompt, index) => {
            return `{prompt: "${replaceFirstAndLast(
                prompt,
                "",
                ""
            )}", name: "${replaceFirstAndLast(
                params[0].nameQ[index],
                "",
                ""
            )}", labels: [${params[0].optionsQ}]}`;
        });

        trial = `
      const trial = {
          type: jsPsychSurveyLikert,
          questions: [
            ${questions} 
          ],
          randomize_question_order: ${params[0].randomQ},
        };
      `;
    } else {
        throw new Error("Invalid survey type");
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

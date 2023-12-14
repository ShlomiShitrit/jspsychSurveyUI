"use client";
import { saveAs } from "file-saver";
import { Button } from "@/app/General/muiComponents";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { replaceFirstAndLast } from "@/app/General/utils";
import ErrorStep from "@/app/Components/Wizard/ErrorStep";
import {
    DownloadBtnProps,
    MultiChoiceQuestion,
    LikertQuestion,
    TextSurveyQuestion,
    TextSurveyState,
    HtmlSurveyQuestion,
    LikertScaleQuestion,
    DropdownSurveyQuestion,
    RankingSurveyQuestion,
    LikertTableQuestion,
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
    STYPE_MULTI_SELECT,
    TYPE_OF_SURVEY_MULTI_CHOICE,
    TYPE_OF_SURVEY_MULTI_SELECT,
    STYPE_TEXT,
} from "@/app/General/Resources/FormsRes";

function DownloadBtn({
    fileName = DOWNLOAD_BTN_EMPTY_STR,
    errorHandler = () => null,
}: DownloadBtnProps) {
    const jspsychVersion = useSelector(
        (state: RootState) => state.version.version
    );

    const surveysList = useSelector((state: RootState) => state.surveyList);

    const trialsList: string[] = [];
    surveysList.forEach((survey, index) => {
        let trial: string = DOWNLOAD_BTN_EMPTY_STR;
        if (
            survey.stype === STYPE_MULTI_CHOICE ||
            survey.stype === STYPE_MULTI_SELECT
        ) {
            let typeOfSurvey: string =
                jspsychVersion === "7.3"
                    ? TYPE_OF_SURVEY_MULTI_CHOICE
                    : "survey-multi-choice";
            if (survey.stype === STYPE_MULTI_SELECT) {
                typeOfSurvey =
                    jspsychVersion === "7.3"
                        ? TYPE_OF_SURVEY_MULTI_SELECT
                        : "survey-multi-select";
            }
            const params = survey.questions as MultiChoiceQuestion[];

            const questions = params.map((question) => {
                return `{prompt: "${question.promptQ}", name: "${question.nameQ}", options: [${question.optionsQ}], required: ${question.required}, horizontal: ${question.horizontal}}`;
            });

            trial =
                jspsychVersion === "7.3"
                    ? `
      const trial${index} = {
          type: ${typeOfSurvey},
          questions: [
            ${questions}
          ],
        };
        timeline.push(trial${index});
      `
                    : `
      var trial${index} = {
          type: "${typeOfSurvey}",
          questions: [
            ${questions}
          ],
        };
        timeline.push(trial${index});`;
            trialsList.push(trial);
        } else if (survey.stype === STYPE_LIKERT) {
            const params = survey.questions as LikertQuestion[];
            const promptQArr = params[0].promptQ as string[];
            const questions = promptQArr.map((prompt, index) => {
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

            trial =
                jspsychVersion === "7.3"
                    ? `
        const labels = [${replacedLabels}];
      const trial${index} = {
          type: jsPsychSurveyLikert,
          questions: [
            ${questions} 
          ],
          randomize_question_order: ${params[0].randomQ},
        };
        timeline.push(trial${index});
      `
                    : `
      var labels = [${replacedLabels}];
    var trial${index} = {
        type: "survey-likert",
        questions: [
          ${questions} 
        ],
        randomize_question_order: ${params[0].randomQ},
      };
      timeline.push(trial${index});
    `;
            trialsList.push(trial);
        } else if (survey.stype === STYPE_TEXT) {
            const allParams = survey.questions as TextSurveyState;
            const params = allParams.textQuestions as TextSurveyQuestion[];
            const preamble = allParams.preamble as string;
            const questions = params.map((question) => {
                return `{prompt: "${question.promptQ}", 
                    name: "${question.nameQ}",
                    placeholder: "${question.placeHolder}",
                    required: ${question.required},
                } `;
            });

            trial =
                jspsychVersion === "7.3"
                    ? `
        const trial${index} = {
            type: jsPsychSurveyText,
            preamble: '${preamble}',
            questions: [
              ${questions}
            ],
            };
            timeline.push(trial${index});
            `
                    : `
            var trial${index} = {
                type: "survey-text",
                preamble: '${preamble}',
                questions: [
                  ${questions}
                ],
                };
                timeline.push(trial${index});
                `;
            trialsList.push(trial);
        } else if (survey.stype === "html") {
            const params = survey.questions as HtmlSurveyQuestion[];
            params.forEach((question, ind) => {
                trial =
                    jspsychVersion === "7.3"
                        ? `
        const trial${index + ind} = {
            type: jsPsychSurveyHtmlForm,
            preamble: '${question.preamble}',
            html: '${question.html}',
            button_label: '${question.buttonLabel}',
            };
            timeline.push(trial${index + ind});
            `
                        : `
            var trial${index + ind} = {
                type: "survey-html-form",
                preamble: '${question.preamble}',
                html: '${question.html}',
                button_label: '${question.buttonLabel}',
                };
                timeline.push(trial${index});
                `;
                trialsList.push(trial);
            });
        } else if (survey.stype === "Likert Scale") {
            const params = survey.questions as LikertScaleQuestion[];
            const questions = params.map((question) => {
                const valuesObj = question.values.map(
                    (value) => `{value: ${value}}`
                );

                return `{
                    type: "likert",
                    prompt: "${question.prompt}", 
                    likert_scale_min_label: "${question.minLabel}",
                    likert_scale_max_label: "${question.maxLabel}", 
                    likert_scale_values: [
                        ${valuesObj}
                    ],
                    }`;
            });
            trial =
                jspsychVersion === "7.3"
                    ? `
        const trial${index} = {
            type: jsPsychSurvey,
            pages: [[
                ${questions}
            ]]
        }
            timeline.push(trial${index})
            `
                    : "jspsych 6.3 does not support Likert Scale";
            trialsList.push(trial);
        } else if (survey.stype === "Dropdown") {
            const params = survey.questions as DropdownSurveyQuestion[];
            const questions = params.map((question) => {
                return `{
                    type: "drop-down",
                    prompt: "${question.prompt}",
                    options: [${question.options}], 
                    option_reorder: "${question.optionsReorder}", 
                    correct_response: 
                        ${
                            question.correctResponse
                                ? `"${question.correctResponse}"`
                                : "null"
                        }
                    ,
                    }`;
            });

            trial =
                jspsychVersion === "7.3"
                    ? `
            const trial${index} = {
                type: jsPsychSurvey,
                pages: [[
                    ${questions}
                ]]
            }
                timeline.push(trial${index})
            `
                    : `jspsych 6.3 does not support Dropdown`;
            trialsList.push(trial);
        } else if (survey.stype === "Ranking") {
            const params = survey.questions as RankingSurveyQuestion[];
            const questions = params.map((question) => {
                return `{
                    type: "ranking",
                    prompt: "${question.prompt}",
                    name: "${question.name}",
                    options: [${question.options}], 
                    option_reorder: "${question.optionsReorder}", 
                    correct_response: 
                        ${
                            question.correctResponse
                                ? `[${question.correctResponse}]`
                                : "null"
                        }
                    ,
                    required: ${question.required},
                    }`;
            });

            trial =
                jspsychVersion === "7.3"
                    ? `
            const trial${index} = {
                type: jsPsychSurvey,
                pages: [[
                    ${questions}
                ]]
            }
                timeline.push(trial${index})
            `
                    : `jspsych 6.3 does not support Ranking`;
            trialsList.push(trial);
        } else if (survey.stype === "Likert Table") {
            const params = survey.questions as LikertTableQuestion[];
            const questions = params.map((question) => {
                const statementsArray = question.statements.map(
                    (statement) =>
                        `{prompt: "${replaceFirstAndLast(
                            statement.prompt
                        )}", name: "${replaceFirstAndLast(statement.name)}"}`
                );

                return `{
                    type: "likert-table",
                    prompt: "${question.prompt}",
                    name: "${question.name}",
                    options: [${question.options}], 
                    statements: [${statementsArray}], 
                    required: ${question.required},
                    }`;
            });
            trial =
                jspsychVersion === "7.3"
                    ? `
        const trial${index} = {
            type: jsPsychSurvey,
            pages: [[
                ${questions}
            ]]
        }
            timeline.push(trial${index})
        `
                    : `jspsych 6.3 does not support likert table`;
            trialsList.push(trial);
        } else {
            errorHandler(ERR_MSG_STYPE);
        }
    });
    const fileContents =
        jspsychVersion === "7.3"
            ? `
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
            <script src="https://unpkg.com/@jspsych/plugin-survey-html-form@1.0.3"></script>
            <script src="https://unpkg.com/@jspsych/plugin-survey@0.2.2"></script>
            <link href="https://unpkg.com/jspsych@7.3.3/css/jspsych.css" rel="stylesheet" type="text/css" />
            <link rel="stylesheet" href="https://unpkg.com/@jspsych/plugin-survey@0.2.2/css/survey.css">
          </head>
        </head>
        <body></body>
        <script>
        const jsPsych = initJsPsych();
        const timeline = [];

        ${trialsList.join("\n")}

    
        jsPsych.run(timeline);
        </script>
    </html>

        `
            : `
        <!DOCTYPE html>
<html>
    <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.1/jspsych.js"></script>
        <script src="jspsych-6.3.1/plugins/jspsych-survey-likert.js"></script>
        <script src="jspsych-6.3.1/plugins/jspsych-survey-multi-choice.js"></script>
        <script src="jspsych-6.3.1/plugins/jspsych-survey-multi-select.js"></script>
        <script src="jspsych-6.3.1/plugins/jspsych-survey-text.js"></script>
        <script src="jspsych-6.3.1/plugins/jspsych-survey-html-form.js"></script>
        <link href="jspsych-6.3.1/css/jspsych.css" rel="stylesheet" type="text/css">
    </head>
    <body></body>
    <script>
    
    var timeline = [];
        

    ${trialsList.join("\n")}

    jsPsych.init({
        timeline: timeline
    })

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

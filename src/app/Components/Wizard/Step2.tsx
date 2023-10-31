"use client";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store/index";
import MultiChoice from "@/app/Components/SurveyTypes/MultiChoice";
import TextSurvey from "@/app/Components/SurveyTypes/TextSurvey";
import Likert from "@/app/Components/SurveyTypes/Likert";
import MultiSelect from "@/app/Components/SurveyTypes/MultiSelect";
import { Step2AndTextSurveyProps, MultiChoiceQuestion } from "@/app/General/interfaces";
import ErrorStep from "@/app/Components/Wizard/ErrorStep";
import {
    MULTI_CHOICE_SURVEY_TYPE,
    TEXT_SURVEY_TYPE,
    LIKERT_SURVEY_TYPE,
    MULTI_SELECT_SURVEY_TYPE,
    ERROR_STEP_MSG,
} from "@/app/General/Resources/WizardRes";

function Step2({
    onSurveyParams,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
    textPreambleHandler,
}: Step2AndTextSurveyProps) {
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );
    switch (surveyType) {
        case MULTI_CHOICE_SURVEY_TYPE:
            return (
                <MultiChoice
                    onSurveyParams={onSurveyParams}
                    inputErrorsHandler={inputErrorsHandler}
                    newErrors={newErrors}
                    isInputErrorHandler={isInputErrorHandler}
                    emptyInputErrors={emptyInputErrors}
                    emptyNewErrors={emptyNewErrors}
                />
            );
        case TEXT_SURVEY_TYPE:
            return (
                <TextSurvey
                    onSurveyParams={onSurveyParams}
                    inputErrorsHandler={inputErrorsHandler}
                    newErrors={newErrors}
                    isInputErrorHandler={isInputErrorHandler}
                    emptyInputErrors={emptyInputErrors}
                    emptyNewErrors={emptyNewErrors}
                    textPreambleHandler={textPreambleHandler}
                />
            );
        case LIKERT_SURVEY_TYPE:
            return (
                <Likert
                    onSurveyParams={onSurveyParams}
                    inputErrorsHandler={inputErrorsHandler}
                    newErrors={newErrors}
                    isInputErrorHandler={isInputErrorHandler}
                    emptyInputErrors={emptyInputErrors}
                    emptyNewErrors={emptyNewErrors}
                />
            );
        case MULTI_SELECT_SURVEY_TYPE:
            return (
                <MultiSelect
                    onSurveyParams={onSurveyParams}
                    inputErrorsHandler={inputErrorsHandler}
                    newErrors={newErrors}
                    isInputErrorHandler={isInputErrorHandler}
                    emptyInputErrors={emptyInputErrors}
                    emptyNewErrors={emptyNewErrors}
                />
            );
        default:
            return <ErrorStep error={ERROR_STEP_MSG} />;
    }
}

export default Step2;

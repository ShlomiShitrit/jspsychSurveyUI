"use client";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store/index";
import MultiChoice from "@/app/Components/SurveyTypes/MultiChoice";
import TextSurvey from "@/app/Components/SurveyTypes/TextSurvey";
import Likert from "@/app/Components/SurveyTypes/Likert";
import MultiSelect from "@/app/Components/SurveyTypes/MultiSelect";
import LikertScale from "@/app/Components/SurveyTypes/LikertScale";
import HtmlSurvey from "@/app/Components/SurveyTypes/HtmlSurvey";
import DropdownSurvey from "@/app/Components/SurveyTypes/DropdownSurvey";
import RankingSurvey from "@/app/Components/SurveyTypes/RankingSurvey";
import { Step2AndTextSurveyProps } from "@/app/General/interfaces";
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
        case "html":
            return (
                <HtmlSurvey
                    onSurveyParams={onSurveyParams}
                    inputErrorsHandler={inputErrorsHandler}
                    newErrors={newErrors}
                    isInputErrorHandler={isInputErrorHandler}
                    emptyInputErrors={emptyInputErrors}
                    emptyNewErrors={emptyNewErrors}
                />
            );
        case "Likert Scale":
            return (
                <LikertScale
                    onSurveyParams={onSurveyParams}
                    inputErrorsHandler={inputErrorsHandler}
                    newErrors={newErrors}
                    isInputErrorHandler={isInputErrorHandler}
                    emptyInputErrors={emptyInputErrors}
                    emptyNewErrors={emptyNewErrors}
                />
            );
        case "Dropdown":
            return (
                <DropdownSurvey
                    onSurveyParams={onSurveyParams}
                    inputErrorsHandler={inputErrorsHandler}
                    newErrors={newErrors}
                    isInputErrorHandler={isInputErrorHandler}
                    emptyInputErrors={emptyInputErrors}
                    emptyNewErrors={emptyNewErrors}
                />
            );
        case "Ranking":
            return (
                <RankingSurvey
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

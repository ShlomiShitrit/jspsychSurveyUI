"use client";
import { ChangeEvent, Fragment } from "react";
import useSurveyForm from "@/app/hooks/useSurveyForm";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";
import { SurveyFormProps, QuestionType } from "@/app/General/interfaces";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import InputTextField from "@/app/Components/Forms/InputTextField";
import useInputError from "@/app/hooks/useInputError";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
import {
    TEXT_PROMPTQ,
    TEXT_FORM_LABEL,
    TOOLTIP_TEXT,
} from "@/app/General/Resources/FormsRes";

export default function HtmlSurveyForm<T extends QuestionType>({
    id,
    questionsChangeHandler,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyFormProps<T>) {
    const { htmlValues } = useSurveyForm<T>(id, questionsChangeHandler);

    const {
        html,
        preamble,
        buttonLabel,
        surveyType,
        setHtml,
        setPreamble,
        setButtonLabel,
    } = htmlValues;

    useInputError(
        emptyInputErrors,
        emptyNewErrors,
        isInputErrorHandler,
        inputErrorsHandler,
        html,
        preamble,
        buttonLabel,
        id,
        "html"
    );

    const inputArr = [
        {
            state: html,
            label: "HTML",
            type: "html",
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setHtml(e.target.value),
            tooltipText: TOOLTIP_TEXT.html,
        },
        {
            state: preamble,
            label: "Preamble",
            type: "html",
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setPreamble(e.target.value),
            tooltipText: TOOLTIP_TEXT.preambleHtml,
        },
        {
            state: buttonLabel,
            label: "Button Label",
            type: TEXT_PROMPTQ,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setButtonLabel(e.target.value),
            tooltipText: TOOLTIP_TEXT.buttonLabel,
        },
    ];

    return (
        <FormControl>
            <FormLabel sx={margin15Style}>Survey Type: {surveyType}</FormLabel>
            <FormLabel sx={matgin10Style}>{TEXT_FORM_LABEL}</FormLabel>
            {inputArr.map((input, index) => (
                <Fragment key={index}>
                    <CustomTooltip title={input.tooltipText} />
                    <InputTextField
                        errorId={`${id}${index}`}
                        id={index}
                        state={input.state}
                        stateHandler={input.stateHandler}
                        labelText={input.label}
                        inputType={input.type}
                        newErrors={newErrors}
                    />
                </Fragment>
            ))}
        </FormControl>
    );
}

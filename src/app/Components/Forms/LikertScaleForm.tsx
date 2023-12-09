"use client";
import { ChangeEvent, Fragment } from "react";
import useSurveyForm from "@/app/hooks/useSurveyForm";
import { FormControl, FormLabel } from "@/app/General/muiComponents";
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

export default function LikertScaleForm<T extends QuestionType>({
    id,
    questionsChangeHandler,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyFormProps<T>) {
    const { likertScaleValues } = useSurveyForm<T>(id, questionsChangeHandler);

    const {
        prompt,
        minLabel,
        maxLabel,
        surveyType,
        valuesNumber,
        setPrompt,
        setMinLabel,
        setMaxLabel,
        setValuesNumber,
    } = likertScaleValues;

    useInputError(
        emptyInputErrors,
        emptyNewErrors,
        isInputErrorHandler,
        inputErrorsHandler,
        prompt,
        minLabel,
        maxLabel,
        id,
        "Likert Scale"
    );

    const inputArr = [
        {
            state: prompt,
            label: "Prompt",
            type: TEXT_PROMPTQ,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setPrompt(e.target.value),
            tooltipText: TOOLTIP_TEXT.prompt,
        },
        {
            state: minLabel,
            label: "Minimum Label",
            type: TEXT_PROMPTQ,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setMinLabel(e.target.value),
            tooltipText: TOOLTIP_TEXT.minLabel,
        },
        {
            state: maxLabel,
            label: "Maximum Label",
            type: TEXT_PROMPTQ,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setMaxLabel(e.target.value),
            tooltipText: TOOLTIP_TEXT.maxLabel,
        },
        {
            state: valuesNumber,
            label: "Values",
            type: "number",
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setValuesNumber(Number(e.target.value)),
            tooltipText: TOOLTIP_TEXT.values,
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

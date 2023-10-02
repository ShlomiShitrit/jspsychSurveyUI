"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";

import OptionsGrid from "@/app/Components/Forms/OptionsGrid";
import AddOptionBtn from "@/app/Components/Forms/AddOptionBtn";
import InputTextField from "@/app/Components/Forms/InputTextField";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import { RootState } from "@/app/store/index";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import { MultiChoiceFormProps } from "@/app/General/interfaces";
import { replaceFirstAndLast } from "@/app/General/utils";
import {
    SURVEY_TYPE_STATE_NUM_ARR,
    SURVEY_TYPE_STATE_2,
    SURVEY_TYPE_COUNTER_PLUS_1,
    SURVEY_TYPE_INDEX_0,
    SURVEY_TYPE_ID_0,
    INDEX_0,
    INDEX_1,
    LENGTH_2,
} from "@/app/General/constants";
import {
    FIRST_FORM_LABEL,
    SECOND_FORM_LABEL,
    MC_EMPTY_STRING,
    OPTION_OPTION_GRID_LABEL,
    REQUIRED_SWITCH_LABEL,
    HORIZONTAL_SWITCH_LABEL,
    INPUT_TYPE_NAME,
    INPUT_TYPE_PROMPT,
    LABEL_PROMPT,
    LABEL_NAME,
    INPUT_ERR_ID_0,
    INPUT_ERR_ID_1,
    INPUT_ERR_ID_2,
    INPUT_ERR_MSG_REQ,
    INPUT_ERR_MSG_OPTIONS,
} from "@/app/General/Resources/FormsRes";

function MultiChoiceForm({
    questionsChangeHandler = () => null,
    id = SURVEY_TYPE_INDEX_0,
    inputErrorsHandler = () => null,
    newErrors = [],
    isInputErrorHandler = () => null,
    emptyInputErrors = () => null,
    emptyNewErrors = () => null,
}: MultiChoiceFormProps) {
    const [promptQ, setPromptQ] = useState(MC_EMPTY_STRING);
    const [nameQ, setNameQ] = useState(MC_EMPTY_STRING);
    const [optionsArrQ, setOptionsArrQ] = useState<string[]>([]);
    const [optionsCount, setOptionsCount] = useState(SURVEY_TYPE_STATE_2);
    const [optionsArray, setOptionsArray] = useState<number[]>(
        SURVEY_TYPE_STATE_NUM_ARR
    );
    const [required, setRequired] = useState(true);
    const [horizontal, setHorizontal] = useState(false);
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );

    const promptQChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPromptQ(e.target.value);
    };
    const nameQChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNameQ(e.target.value);
    };

    const optionsQArrChangeHandler =
        (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
            const updatedOptions = [...optionsArrQ];
            updatedOptions[index] = `'${e.target.value}'`;
            setOptionsArrQ(updatedOptions);
        };

    const addOption = () => {
        setOptionsCount(optionsCount + SURVEY_TYPE_COUNTER_PLUS_1);
        setOptionsArray([...optionsArray, optionsCount]);
    };

    const requiredSwitchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRequired(e.target.checked);
    };

    const horizontalSwitchChangeHandler = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setHorizontal(e.target.checked);
    };

    const QuestionData = {
        index: id,
        promptQ: promptQ,
        nameQ: nameQ,
        optionsQ: optionsArrQ,
        required: required,
        horizontal: horizontal,
    };

    useEffect(() => {
        questionsChangeHandler(id, QuestionData);
    }, [QuestionData]);

    useEffect(() => {
        emptyInputErrors();
        emptyNewErrors();
        if (promptQ.trim() === MC_EMPTY_STRING) {
            isInputErrorHandler(true);
            inputErrorsHandler(`${id}${INPUT_ERR_ID_0}`, INPUT_ERR_MSG_REQ);
        } else if (nameQ.trim() === MC_EMPTY_STRING) {
            isInputErrorHandler(true);
            inputErrorsHandler(`${id}${INPUT_ERR_ID_1}`, INPUT_ERR_MSG_REQ);
        } else if (
            optionsArrQ.length < LENGTH_2 ||
            replaceFirstAndLast(
                optionsArrQ[INDEX_0],
                MC_EMPTY_STRING,
                MC_EMPTY_STRING
            ) === MC_EMPTY_STRING ||
            replaceFirstAndLast(
                optionsArrQ[INDEX_1],
                MC_EMPTY_STRING,
                MC_EMPTY_STRING
            ) === MC_EMPTY_STRING
        ) {
            isInputErrorHandler(true);
            inputErrorsHandler(`${id}${INPUT_ERR_ID_2}`, INPUT_ERR_MSG_OPTIONS);
        } else {
            isInputErrorHandler(false);
            emptyInputErrors();
            emptyNewErrors();
        }
    }, [promptQ, nameQ, optionsArrQ]);

    const switchLabelArr = [
        {
            state: required,
            stateHandler: requiredSwitchChangeHandler,
            text: REQUIRED_SWITCH_LABEL,
        },
        {
            state: horizontal,
            stateHandler: horizontalSwitchChangeHandler,
            text: HORIZONTAL_SWITCH_LABEL,
        },
    ];

    const inputFieldArr = [
        {
            id: SURVEY_TYPE_ID_0,
            state: promptQ,
            stateHandler: promptQChangeHandler,
            labelText: LABEL_PROMPT,
            inputType: INPUT_TYPE_PROMPT,
        },
        {
            id: SURVEY_TYPE_ID_0,
            state: nameQ,
            stateHandler: nameQChangeHandler,
            labelText: LABEL_NAME,
            inputType: INPUT_TYPE_NAME,
        },
    ];

    return (
        <Box sx={matgin10Style}>
            <FormControl>
                <FormLabel sx={margin15Style}>
                    {FIRST_FORM_LABEL} {surveyType}
                </FormLabel>
                <FormLabel sx={matgin10Style}>{SECOND_FORM_LABEL}</FormLabel>
                {inputFieldArr.map((inputField, index) => (
                    <InputTextField
                        key={index}
                        errorId={`${id}${index}`}
                        id={inputField.id}
                        state={inputField.state}
                        stateHandler={inputField.stateHandler}
                        labelText={inputField.labelText}
                        newErrors={newErrors}
                        inputType={inputField.inputType}
                    />
                ))}
                <OptionsGrid
                    newErrors={newErrors}
                    errorId={`${id}${INPUT_ERR_ID_2}`}
                    labelText={OPTION_OPTION_GRID_LABEL}
                    optionsQ={optionsArrQ}
                    optionsQChangeHandler={optionsQArrChangeHandler}
                    optionsArray={optionsArray}
                />
                <AddOptionBtn addOption={addOption} />
                {switchLabelArr.map((switchLabel, index) => (
                    <SwitchLabel
                        key={index}
                        isState={switchLabel.state}
                        stateHandler={switchLabel.stateHandler}
                        labelText={switchLabel.text}
                    />
                ))}
            </FormControl>
        </Box>
    );
}

export default MultiChoiceForm;

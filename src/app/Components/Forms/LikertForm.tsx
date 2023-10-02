"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";
import { useSelector } from "react-redux";

import OptionsGrid from "@/app/Components/Forms/OptionsGrid";
import AddOptionBtn from "@/app/Components/Forms/AddOptionBtn";
import PromptGrid from "@/app/Components/Forms/PromptGrid";
import { RootState } from "@/app/store/index";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import { LikertFormProps } from "@/app/General/interfaces";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import { replaceFirstAndLast } from "@/app/General/utils";
import {
    SURVEY_TYPE_STATE_NUM_ARR,
    SURVEY_TYPE_STATE_2,
    SURVEY_TYPE_COUNTER_PLUS_1,
    INDEX_0,
    INDEX_1,
    LENGTH_0,
    LENGTH_2,
    COUNTER_1,
    ARR_0,
    ID_0,
} from "@/app/General/constants";
import {
    FIRST_FORM_LABEL,
    SECOND_FORM_LABEL,
    LABEL_OPTION_GRID_LABEL,
    RANDOM_SWITCH_LABEL,
    EMPTY_STRING,
    INPUT_ERR_ID_0,
    INPUT_ERR_ID_1,
    INPUT_ERR_ID_2,
    INPUT_ERR_MSG_OPTIONS,
    INPUT_ERR_MSG_PROMPT,
    INPUT_ERR_MSG_NAME,
} from "@/app/General/Resources/FormsRes";

function LikertForm({
    questionsChangeHandler = () => null,
    id = ID_0,
    inputErrorsHandler = () => null,
    newErrors = [],
    isInputErrorHandler = () => null,
    emptyInputErrors = () => null,
    emptyNewErrors = () => null,
}: LikertFormProps) {
    const [optionsQ, setOptionsQ] = useState<string[]>([]);
    const [optionsCount, setOptionsCount] = useState(SURVEY_TYPE_STATE_2);
    const [optionsArray, setOptionsArray] = useState<number[]>(
        SURVEY_TYPE_STATE_NUM_ARR
    );
    const [promptsQ, setPromptsQ] = useState<string[]>([]);
    const [promptsCount, setPromptsCount] = useState(COUNTER_1);
    const [promptsArray, setPromptsArray] = useState<number[]>(ARR_0);
    const [namesQ, setNamesQ] = useState<string[]>([]);
    const [nameCount, setNameCount] = useState(COUNTER_1);
    const [nameArray, setNameArray] = useState<number[]>(ARR_0);
    const [randomQ, setRandomQ] = useState(false);
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );

    const stateQHandler =
        (
            arrayQ: string[],
            setArrayQ: (value: React.SetStateAction<string[]>) => void
        ) =>
        (index: number) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            const updatedArray = [...arrayQ];
            updatedArray[index] = `'${e.target.value}'`;
            setArrayQ(updatedArray);
        };

    const addInput = (option: boolean = true) => {
        if (option) {
            setOptionsCount(optionsCount + SURVEY_TYPE_COUNTER_PLUS_1);
            setOptionsArray([...optionsArray, optionsCount]);
        } else {
            setPromptsCount(promptsCount + SURVEY_TYPE_COUNTER_PLUS_1);
            setPromptsArray([...promptsArray, promptsCount]);
            setNameCount(nameCount + SURVEY_TYPE_COUNTER_PLUS_1);
            setNameArray([...nameArray, nameCount]);
        }
    };

    const randomChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRandomQ(e.target.checked);
    };

    const QuestionData = {
        index: id,
        promptQ: promptsQ,
        nameQ: namesQ,
        optionsQ: optionsQ,
        randomQ: randomQ,
    };

    useEffect(() => {
        questionsChangeHandler(id, QuestionData);
    }, [QuestionData]);

    useEffect(() => {
        emptyInputErrors();
        emptyNewErrors();
        if (
            promptsQ.length === LENGTH_0 ||
            replaceFirstAndLast(
                promptsQ[INDEX_0],
                EMPTY_STRING,
                EMPTY_STRING
            ) === EMPTY_STRING
        ) {
            isInputErrorHandler(true);
            inputErrorsHandler(`${id}${INPUT_ERR_ID_0}`, INPUT_ERR_MSG_PROMPT);
        } else if (
            namesQ.length === LENGTH_0 ||
            replaceFirstAndLast(namesQ[INDEX_0], EMPTY_STRING, EMPTY_STRING) ===
                EMPTY_STRING
        ) {
            isInputErrorHandler(true);
            inputErrorsHandler(`${id}${INPUT_ERR_ID_1}`, INPUT_ERR_MSG_NAME);
        } else if (
            optionsQ.length < LENGTH_2 ||
            replaceFirstAndLast(
                optionsQ[INDEX_0],
                EMPTY_STRING,
                EMPTY_STRING
            ) === EMPTY_STRING ||
            replaceFirstAndLast(
                optionsQ[INDEX_1],
                EMPTY_STRING,
                EMPTY_STRING
            ) === EMPTY_STRING
        ) {
            isInputErrorHandler(true);
            inputErrorsHandler(`${id}${INPUT_ERR_ID_2}`, INPUT_ERR_MSG_OPTIONS);
        } else {
            isInputErrorHandler(false);
            emptyInputErrors();
            emptyNewErrors();
        }
    }, [promptsQ, namesQ, optionsQ]);

    const promptGridErrorIds = {
        prompt: `${id}${INPUT_ERR_ID_0}`,
        name: `${id}${INPUT_ERR_ID_1}`,
    };

    return (
        <Box sx={matgin10Style}>
            <FormControl>
                <FormLabel sx={margin15Style}>
                    {FIRST_FORM_LABEL} {surveyType}
                </FormLabel>
                <FormLabel sx={matgin10Style}>{SECOND_FORM_LABEL}</FormLabel>

                <OptionsGrid
                    newErrors={newErrors}
                    errorId={`${id}${INPUT_ERR_ID_2}`}
                    labelText={LABEL_OPTION_GRID_LABEL}
                    optionsQ={optionsQ}
                    optionsQChangeHandler={stateQHandler(optionsQ, setOptionsQ)}
                    optionsArray={optionsArray}
                />
                <AddOptionBtn addOption={addInput} />
                <PromptGrid
                    newErrors={newErrors}
                    errorId={promptGridErrorIds}
                    promptsQ={promptsQ}
                    promptsQChangeHandler={stateQHandler(promptsQ, setPromptsQ)}
                    promptsArray={promptsArray}
                    namesQ={namesQ}
                    nameQChangeHandler={stateQHandler(namesQ, setNamesQ)}
                    nameArray={nameArray}
                />
                <AddOptionBtn addOption={() => addInput(false)} />
                <SwitchLabel
                    labelText={RANDOM_SWITCH_LABEL}
                    isState={randomQ}
                    stateHandler={randomChangeHandler}
                />
            </FormControl>
        </Box>
    );
}

export default LikertForm;

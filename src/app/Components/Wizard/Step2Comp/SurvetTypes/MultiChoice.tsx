"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";

import OptionsGrid from "@/app/Components/Wizard/Step2Comp/Form/OptionsGrid";
import AddOptionBtn from "@/app/Components/Wizard/Step2Comp/Form/AddOptionBtn";
import InputTextField from "@/app/Components/Wizard/Step2Comp/Form/InputTextField";
import SwitchLabel from "@/app/Components/Wizard/Step2Comp/Form/SwitchLabel";
import { RootState } from "@/app/store/index";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import { MultiChoiceProps } from "@/app/General/interfaces";
import {
    SURVEY_TYPE_STATE_NUM_ARR,
    SURVEY_TYPE_STATE_2,
    SURVEY_TYPE_COUNTER_PLUS_1,
    SURVEY_TYPE_INDEX_0,
    SURVEY_TYPE_ID_0,
} from "@/app/General/constants";
import {
    FIRST_FORM_LABEL,
    SECOND_FORM_LABEL,
    EMPTY_STRING,
    OPTION_OPTION_GRID_LABEL,
    REQUIRED_SWITCH_LABEL,
    HORIZONTAL_SWITCH_LABEL,
    INPUT_TYPE_NAME,
    INPUT_TYPE_PROMPT,
    LABEL_PROMPT,
    LABEL_NAME,
} from "@/app/General/Resources/Step2SurveyTypeRes";

function MultiChoice({ onSurveyParams = () => null }: MultiChoiceProps) {
    const [promptQ, setPromptQ] = useState(EMPTY_STRING);
    const [nameQ, setNameQ] = useState(EMPTY_STRING);
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

    useEffect(() => {
        const QuestionData = {
            index: SURVEY_TYPE_INDEX_0,
            promptQ: promptQ,
            nameQ: nameQ,
            optionsQ: optionsArrQ,
            required: required,
            horizontal: horizontal,
        };
        onSurveyParams(QuestionData);
    }, []);

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
                        id={inputField.id}
                        state={inputField.state}
                        stateHandler={inputField.stateHandler}
                        labelText={inputField.labelText}
                    />
                ))}
                <OptionsGrid
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

export default MultiChoice;

"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";

import PromptInput from "@/app/Components/Wizard/Step2Comp/Form/PromptInput";
import NameInput from "@/app/Components/Wizard/Step2Comp/Form/NameInput";
import OptionsGrid from "@/app/Components/Wizard/Step2Comp/Form/OptionsGrid";
import AddOptionBtn from "@/app/Components/Wizard/Step2Comp/Form/AddOptionBtn";
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
} from "@/app/General/Resources/Step2SurveyTypeRes";

function MultiChoice({ onSurveyParams = () => null }: MultiChoiceProps) {
    const [promptQ, setPromptQ] = useState(EMPTY_STRING);
    const [nameQ, setnameQ] = useState(EMPTY_STRING);
    const [optionsQ, setOptionsQ] = useState<string[]>([]);
    const [optionsCount, setOptionsCount] = useState(SURVEY_TYPE_STATE_2);
    const [optionsArray, setOptionsArray] = useState<number[]>(
        SURVEY_TYPE_STATE_NUM_ARR
    );
    const [required, setRequired] = useState(true);
    const [horizontal, setHorizontal] = useState(false);
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );

    const inputChangeHandler =
        (setState: (value: React.SetStateAction<string>) => void) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            setState(e.target.value);
        };

    const optionsQChangeHandler =
        (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
            const updatedOptions = [...optionsQ];
            updatedOptions[index] = `'${e.target.value}'`;
            setOptionsQ(updatedOptions);
        };

    const addOption = () => {
        setOptionsCount(optionsCount + SURVEY_TYPE_COUNTER_PLUS_1);
        setOptionsArray([...optionsArray, optionsCount]);
    };

    const switchChangeHandler =
        (setState: (value: React.SetStateAction<boolean>) => void) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            setState(e.target.checked);
        };

    useEffect(() => {
        const QuestionData = {
            index: SURVEY_TYPE_INDEX_0,
            promptQ: promptQ,
            nameQ: nameQ,
            optionsQ: optionsQ,
            required: required,
            horizontal: horizontal,
        };
        onSurveyParams(QuestionData);
    });

    return (
        <Box sx={matgin10Style}>
            <FormControl>
                <FormLabel sx={margin15Style}>
                    {FIRST_FORM_LABEL} {surveyType}
                </FormLabel>
                <FormLabel sx={matgin10Style}>{SECOND_FORM_LABEL}</FormLabel>
                <PromptInput
                    id={SURVEY_TYPE_ID_0}
                    state={promptQ}
                    stateHandler={inputChangeHandler(setPromptQ)}
                />
                <NameInput
                    id={SURVEY_TYPE_ID_0}
                    state={nameQ}
                    stateHandler={inputChangeHandler(setnameQ)}
                />
                <OptionsGrid
                    labelText={OPTION_OPTION_GRID_LABEL}
                    optionsQ={optionsQ}
                    optionsQChangeHandler={optionsQChangeHandler}
                    optionsArray={optionsArray}
                />
                <AddOptionBtn addOption={addOption} />

                <SwitchLabel
                    isState={required}
                    stateHandler={switchChangeHandler(setRequired)}
                    labelText={REQUIRED_SWITCH_LABEL}
                />
                <SwitchLabel
                    isState={horizontal}
                    stateHandler={switchChangeHandler(setHorizontal)}
                    labelText={HORIZONTAL_SWITCH_LABEL}
                />
            </FormControl>
        </Box>
    );
}

export default MultiChoice;

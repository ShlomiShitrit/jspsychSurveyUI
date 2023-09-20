"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";
import { useSelector } from "react-redux";

import OptionsGrid from "@/app/Components/Wizard/Step2Comp/Form/OptionsGrid";
import AddOptionBtn from "@/app/Components/Wizard/Step2Comp/Form/AddOptionBtn";
import PromptGrid from "@/app/Components/Wizard/Step2Comp/Form/PromptGrid";
import { RootState } from "@/app/store/index";
import SwitchLabel from "@/app/Components/Wizard/Step2Comp/Form/SwitchLabel";
import { LikertProps } from "@/app/General/interfaces";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import {
    SURVEY_TYPE_STATE_NUM_ARR,
    SURVEY_TYPE_STATE_2,
    SURVEY_TYPE_COUNTER_PLUS_1,
    SURVEY_TYPE_INDEX_0,
} from "@/app/General/constants";
import {
    FIRST_FORM_LABEL,
    SECOND_FORM_LABEL,
    LABEL_OPTION_GRID_LABEL,
    RANDOM_SWITCH_LABEL,
} from "@/app/General/Resources/Step2SurveyTypeRes";

function Likert({ onSurveyParams = () => null }: LikertProps) {
    const [optionsQ, setOptionsQ] = useState<string[]>([]);
    const [optionsCount, setOptionsCount] = useState(SURVEY_TYPE_STATE_2);
    const [optionsArray, setOptionsArray] = useState<number[]>(
        SURVEY_TYPE_STATE_NUM_ARR
    );
    const [promptsQ, setPromptsQ] = useState<string[]>([]);
    const [promptsCount, setPromptsCount] = useState(SURVEY_TYPE_STATE_2);
    const [promptsArray, setPromptsArray] = useState<number[]>(
        SURVEY_TYPE_STATE_NUM_ARR
    );
    const [namesQ, setNamesQ] = useState<string[]>([]);
    const [nameCount, setNameCount] = useState(SURVEY_TYPE_STATE_2);
    const [nameArray, setNameArray] = useState<number[]>(
        SURVEY_TYPE_STATE_NUM_ARR
    );
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

    useEffect(() => {
        const QuestionData = {
            index: SURVEY_TYPE_INDEX_0,
            promptQ: promptsQ,
            nameQ: namesQ,
            optionsQ: optionsQ,
            randomQ: randomQ,
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

                <OptionsGrid
                    labelText={LABEL_OPTION_GRID_LABEL}
                    optionsQ={optionsQ}
                    optionsQChangeHandler={stateQHandler(optionsQ, setOptionsQ)}
                    optionsArray={optionsArray}
                />
                <AddOptionBtn addOption={addInput} />
                <PromptGrid
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

export default Likert;

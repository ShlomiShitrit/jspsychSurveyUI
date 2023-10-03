"use client";
import { useState, ChangeEvent, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";

import OptionsGrid from "@/app/Components/Forms/OptionsGrid";
import AddOptionBtn from "@/app/Components/Forms/AddOptionBtn";
import InputTextField from "@/app/Components/Forms/InputTextField";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import { RootState } from "@/app/store/index";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import { MultiChoiceFormProps } from "@/app/General/interfaces";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
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
    MC_EMPTY_STRING,
    OPTION_OPTION_GRID_LABEL,
    REQUIRED_SWITCH_LABEL,
    HORIZONTAL_SWITCH_LABEL,
    INPUT_TYPE_NAME,
    INPUT_TYPE_PROMPT,
    LABEL_PROMPT,
    LABEL_NAME,
    TOOLTIP_TEXT,
} from "@/app/General/Resources/FormsRes";

function MultiChoiceForm({
    questionsChangeHandler = () => null,
    id = SURVEY_TYPE_INDEX_0,
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

    const switchLabelArr = [
        {
            state: required,
            stateHandler: requiredSwitchChangeHandler,
            text: REQUIRED_SWITCH_LABEL,
            tooltipText: TOOLTIP_TEXT.switchLabelRequired,
        },
        {
            state: horizontal,
            stateHandler: horizontalSwitchChangeHandler,
            text: HORIZONTAL_SWITCH_LABEL,
            tooltipText: TOOLTIP_TEXT.switchLabelHorizontal,
        },
    ];

    const inputFieldArr = [
        {
            id: SURVEY_TYPE_ID_0,
            state: promptQ,
            stateHandler: promptQChangeHandler,
            labelText: LABEL_PROMPT,
            inputType: INPUT_TYPE_PROMPT,
            tooltipText: TOOLTIP_TEXT.prompt,
        },
        {
            id: SURVEY_TYPE_ID_0,
            state: nameQ,
            stateHandler: nameQChangeHandler,
            labelText: LABEL_NAME,
            inputType: INPUT_TYPE_NAME,
            tooltipText: TOOLTIP_TEXT.name,
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
                    <Fragment>
                        <CustomTooltip
                            key={index}
                            title={inputField.tooltipText}
                        />
                        <InputTextField
                            key={index}
                            id={inputField.id}
                            state={inputField.state}
                            stateHandler={inputField.stateHandler}
                            labelText={inputField.labelText}
                        />
                    </Fragment>
                ))}
                <CustomTooltip title={TOOLTIP_TEXT.option} />
                <OptionsGrid
                    labelText={OPTION_OPTION_GRID_LABEL}
                    optionsQ={optionsArrQ}
                    optionsQChangeHandler={optionsQArrChangeHandler}
                    optionsArray={optionsArray}
                />

                <AddOptionBtn addOption={addOption} />
                {switchLabelArr.map((switchLabel, index) => (
                    // TODO: move to constants
                    <Box key={index} sx={{ flex: 1 }}>
                        <SwitchLabel
                            isState={switchLabel.state}
                            stateHandler={switchLabel.stateHandler}
                            labelText={switchLabel.text}
                        />
                        <CustomTooltip title={switchLabel.tooltipText} />
                    </Box>
                ))}
            </FormControl>
        </Box>
    );
}

export default MultiChoiceForm;

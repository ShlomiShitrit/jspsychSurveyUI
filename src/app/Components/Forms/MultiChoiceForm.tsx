"use client";
import { useState, ChangeEvent, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";

import OptionsGrid from "@/app/Components/Forms/OptionsGrid";
import OptionBtn from "@/app/Components/Forms/OptionBtn";
import InputTextField from "@/app/Components/Forms/InputTextField";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import { RootState } from "@/app/store/index";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import { SurveyFormProps, QuestionType } from "@/app/General/interfaces";
import useInputError from "@/app/hooks/use-input-error";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
import {
    FORM_NUM_ARR_STATE_DEFAULT,
    FORM_COUNTER_STATE_DEFAULT_2,
    FORM_COUNTER_PLUS_1,
    FORM_ID_PROP_DEFAULT_0,
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
    INPUT_ERR_ID_2,
    MULTI_CHOICE_STYPE,
    TOOLTIP_TEXT,
} from "@/app/General/Resources/FormsRes";

function MultiChoiceForm<T extends QuestionType>({
    questionsChangeHandler = () => null,
    id = FORM_ID_PROP_DEFAULT_0,
    inputErrorsHandler = () => null,
    newErrors = [],
    isInputErrorHandler = () => null,
    emptyInputErrors = () => null,
    emptyNewErrors = () => null,
}: SurveyFormProps<T>) {
    const [promptQ, setPromptQ] = useState(MC_EMPTY_STRING);
    const [nameQ, setNameQ] = useState(MC_EMPTY_STRING);
    const [optionsArrQ, setOptionsArrQ] = useState<string[]>([]);
    const [optionsCount, setOptionsCount] = useState(
        FORM_COUNTER_STATE_DEFAULT_2
    );
    const [optionsArray, setOptionsArray] = useState<number[]>(
        FORM_NUM_ARR_STATE_DEFAULT
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
        setOptionsCount(optionsCount + FORM_COUNTER_PLUS_1);
        setOptionsArray([...optionsArray, optionsCount]);
    };

    const removeOption = () => {
        if (optionsCount === FORM_COUNTER_STATE_DEFAULT_2) return;
        const updatedOptions = [...optionsArrQ];
        updatedOptions.pop();
        setOptionsArrQ(updatedOptions);
        const updatedOptionsArray = [...optionsArray];
        updatedOptionsArray.pop();
        setOptionsArray(updatedOptionsArray);
        setOptionsCount(optionsCount - FORM_COUNTER_PLUS_1);
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
        questionsChangeHandler(id, QuestionData as T);
    }, [QuestionData]);

    useInputError(
        emptyInputErrors,
        emptyNewErrors,
        isInputErrorHandler,
        inputErrorsHandler,
        promptQ,
        nameQ,
        optionsArrQ,
        id,
        MULTI_CHOICE_STYPE
    );

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
            id: FORM_ID_PROP_DEFAULT_0,
            state: promptQ,
            stateHandler: promptQChangeHandler,
            labelText: LABEL_PROMPT,
            inputType: INPUT_TYPE_PROMPT,
            tooltipText: TOOLTIP_TEXT.prompt,
        },
        {
            id: FORM_ID_PROP_DEFAULT_0,
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
                    <Fragment key={index}>
                        <CustomTooltip title={inputField.tooltipText} />
                        <InputTextField
                            id={inputField.id}
                            errorId={`${id}${index}`}
                            state={inputField.state}
                            stateHandler={inputField.stateHandler}
                            labelText={inputField.labelText}
                            newErrors={newErrors}
                            inputType={inputField.inputType}
                        />
                    </Fragment>
                ))}
                <CustomTooltip title={TOOLTIP_TEXT.option} />
                <OptionsGrid
                    newErrors={newErrors}
                    errorId={`${id}${INPUT_ERR_ID_2}`}
                    labelText={OPTION_OPTION_GRID_LABEL}
                    optionsQ={optionsArrQ}
                    optionsQChangeHandler={optionsQArrChangeHandler}
                    optionsArray={optionsArray}
                />
                <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                    <OptionBtn optionHandler={addOption} isAdd={true} />
                    <OptionBtn optionHandler={removeOption} isAdd={false} />
                </Box>
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

"use client";
import { ChangeEvent, Fragment } from "react";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";
import useSurveyForm from "@/app/hooks/useSurveyForm";
import OptionsGrid from "@/app/Components/Forms/OptionsGrid";
import OptionBtn from "@/app/Components/Forms/OptionBtn";
import InputTextField from "@/app/Components/Forms/InputTextField";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import { SurveyFormProps, QuestionType } from "@/app/General/interfaces";
import useInputError from "@/app/hooks/useInputError";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
import { FORM_ID_PROP_DEFAULT_0 } from "@/app/General/constants";
import {
    FIRST_FORM_LABEL,
    SECOND_FORM_LABEL,
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
    questionsChangeHandler,
    id,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyFormProps<T>) {
    const { multiChoiceValues } = useSurveyForm<T>(id, questionsChangeHandler);

    const {
        name,
        optionsArray,
        required,
        horizontal,
        prompt,
        options,
        surveyType,
        addInput,
        removeInput,
        stateHandler,
        setPrompt,
        setOptions,
        setName,
        setRequired,
        setHorizontal,
    } = multiChoiceValues;

    useInputError(
        emptyInputErrors,
        emptyNewErrors,
        isInputErrorHandler,
        inputErrorsHandler,
        prompt,
        name,
        options,
        id,
        MULTI_CHOICE_STYPE
    );

    const switchLabelArr = [
        {
            state: required,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setRequired(e.target.checked),
            text: REQUIRED_SWITCH_LABEL,
            tooltipText: TOOLTIP_TEXT.switchLabelRequired,
        },
        {
            state: horizontal,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setHorizontal(e.target.checked),
            text: HORIZONTAL_SWITCH_LABEL,
            tooltipText: TOOLTIP_TEXT.switchLabelHorizontal,
        },
    ];

    const inputFieldArr = [
        {
            id: FORM_ID_PROP_DEFAULT_0,
            state: prompt,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setPrompt(e.target.value),
            labelText: LABEL_PROMPT,
            inputType: INPUT_TYPE_PROMPT,
            tooltipText: TOOLTIP_TEXT.prompt,
        },
        {
            id: FORM_ID_PROP_DEFAULT_0,
            state: name,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value),
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
                    optionsQ={options}
                    optionsQChangeHandler={stateHandler(options, setOptions)}
                    optionsArray={optionsArray}
                />
                <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                    <OptionBtn optionHandler={addInput} isAdd={true} />
                    <OptionBtn optionHandler={removeInput} isAdd={false} />
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

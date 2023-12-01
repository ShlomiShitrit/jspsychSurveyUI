"use client";
import React, { ChangeEvent } from "react";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";
import useSurveyForm from "@/app/hooks/useSurveyForm";
import OptionsGrid from "@/app/Components/Forms/OptionsGrid";
import OptionBtn from "@/app/Components/Forms/OptionBtn";
import PromptGrid from "@/app/Components/Forms/PromptGrid";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import { SurveyFormProps, QuestionType } from "@/app/General/interfaces";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import useInputError from "@/app/hooks/useInputError";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
import {
    FIRST_FORM_LABEL,
    SECOND_FORM_LABEL,
    LABEL_OPTION_GRID_LABEL,
    RANDOM_SWITCH_LABEL,
    INPUT_ERR_ID_0,
    INPUT_ERR_ID_1,
    INPUT_ERR_ID_2,
    LIKERT_STYPE,
    TOOLTIP_TEXT,
} from "@/app/General/Resources/FormsRes";

function LikertForm<T extends QuestionType>({
    questionsChangeHandler,
    id,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyFormProps<T>) {
    const { likertValues } = useSurveyForm<T>(id, questionsChangeHandler);

    const {
        prompts,
        names,
        options,
        surveyType,
        optionsArray,
        promptsArray,
        nameArray,
        random,
        addInput,
        removeInput,
        stateHandler,
        setPrompts,
        setRandom,
        setOptions,
        setNames,
    } = likertValues;

    useInputError(
        emptyInputErrors,
        emptyNewErrors,
        isInputErrorHandler,
        inputErrorsHandler,
        prompts,
        names,
        options,
        id,
        LIKERT_STYPE
    );

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

                <CustomTooltip title={TOOLTIP_TEXT.labels} />
                <OptionsGrid
                    newErrors={newErrors}
                    errorId={`${id}${INPUT_ERR_ID_2}`}
                    labelText={LABEL_OPTION_GRID_LABEL}
                    optionsQ={options}
                    optionsQChangeHandler={stateHandler(options, setOptions)}
                    optionsArray={optionsArray}
                />
                {/* TODO: move to styles */}
                <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                    <OptionBtn optionHandler={addInput} isAdd={true} />
                    <OptionBtn optionHandler={removeInput} isAdd={false} />
                </Box>
                <br />
                <CustomTooltip title={TOOLTIP_TEXT.promptName} />
                <PromptGrid
                    newErrors={newErrors}
                    errorId={promptGridErrorIds}
                    optionsQ={prompts}
                    optionsQChangeHandler={stateHandler(prompts, setPrompts)}
                    optionsArray={promptsArray}
                    namesQ={names}
                    nameQChangeHandler={stateHandler(names, setNames)}
                    nameArray={nameArray}
                />
                {/* TODO: move to styles */}
                <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                    <OptionBtn
                        optionHandler={() => addInput(false)}
                        isAdd={true}
                    />
                    <OptionBtn
                        optionHandler={() => removeInput(false)}
                        isAdd={false}
                    />
                </Box>
                {/*  TODO: move to constants */}
                <Box sx={{ flex: 1 }}>
                    <SwitchLabel
                        labelText={RANDOM_SWITCH_LABEL}
                        isState={random}
                        stateHandler={(e: ChangeEvent<HTMLInputElement>) =>
                            setRandom(e.target.checked)
                        }
                    />
                    <CustomTooltip title={TOOLTIP_TEXT.random} />
                </Box>
            </FormControl>
        </Box>
    );
}

export default LikertForm;

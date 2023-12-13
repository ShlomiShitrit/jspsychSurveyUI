"use client";
import { ChangeEvent, useEffect } from "react";
import useSurveyForm from "@/app/hooks/useSurveyForm";
import OptionsGrid from "@/app/Components/Forms/OptionsGrid";
import OptionBtn from "@/app/Components/Forms/OptionBtn";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import InputTextField from "@/app/Components/Forms/InputTextField";
import {
    FormControl,
    FormLabel,
    Box,
    Select,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
} from "@/app/General/muiComponents";
import { SurveyFormProps, QuestionType } from "@/app/General/interfaces";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import useInputError from "@/app/hooks/useInputError";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
import {
    TOOLTIP_TEXT,
    FIRST_FORM_LABEL,
    SECOND_FORM_LABEL,
} from "@/app/General/Resources/FormsRes";
import { replaceFirstAndLast } from "@/app/General/utils";
import { reorder } from "@/app/General/types";

export default function DropdownSurveyForm<T extends QuestionType>({
    id,
    questionsChangeHandler,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyFormProps<T>) {
    const { dropdownValues } = useSurveyForm<T>(id, questionsChangeHandler);

    const {
        prompt,
        options,
        optionsArray,
        optionsReorder,
        isCorrectResponse,
        correctResponse,
        surveyType,
        addInput,
        removeInput,
        stateHandler,
        setPrompt,
        setOptions,
        setOptionsReorder,
        setIsCorrectResponse,
        setCorrectResponse,
    } = dropdownValues;

    useInputError(
        emptyInputErrors,
        emptyNewErrors,
        isInputErrorHandler,
        inputErrorsHandler,
        options,
        optionsReorder,
        correctResponse || "",
        id,
        "Dropdown"
    );

    useEffect(() => {
        if (!isCorrectResponse) {
            setCorrectResponse(null);
        }
    }, [isCorrectResponse]);

    const reorderArray = ["none", "asc", "desc", "random"];
    const reorderArrayDisplay = ["None", "Ascend", "Descend", "Random"];

    return (
        <Box sx={matgin10Style}>
            <FormControl>
                <FormLabel sx={margin15Style}>
                    {FIRST_FORM_LABEL} {surveyType}
                </FormLabel>
                <FormLabel sx={matgin10Style}>{SECOND_FORM_LABEL}</FormLabel>
                <CustomTooltip title={TOOLTIP_TEXT.prompt} />
                <InputTextField
                    id={id}
                    errorId={`${id}0`}
                    state={prompt}
                    stateHandler={(e: ChangeEvent<HTMLInputElement>) =>
                        setPrompt(e.target.value)
                    }
                    labelText={"Prompt"}
                    newErrors={newErrors}
                    inputType={"promptQ"}
                />
                <br />
                <CustomTooltip title={TOOLTIP_TEXT.option} />
                <OptionsGrid
                    newErrors={newErrors}
                    errorId={`${id}2`}
                    labelText={"Option"}
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
                <br />
                <br />
                <CustomTooltip
                    title={`The options reorder affect the display order of the options. 
                        If it is 'none' the options will display
                         in the order the have been writen`}
                />
                <br />
                <FormControl>
                    <InputLabel id="select-option-reorder">
                        Option Reorder
                    </InputLabel>
                    <Select
                        label="Option Reorder"
                        value={optionsReorder}
                        labelId="select-option-reorder"
                        onChange={(e: SelectChangeEvent) =>
                            setOptionsReorder(e.target.value as reorder)
                        }
                    >
                        {reorderArray.map((reorderOption, index) => (
                            <MenuItem key={index} value={reorderOption}>
                                {reorderArrayDisplay[index]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ flex: 1 }}>
                    <SwitchLabel
                        isState={isCorrectResponse}
                        stateHandler={(e: ChangeEvent<HTMLInputElement>) =>
                            setIsCorrectResponse(e.target.checked)
                        }
                        labelText={"Is a Correct Response?"}
                    />
                    <br />
                </Box>
                {isCorrectResponse ? (
                    <>
                        <CustomTooltip
                            title={"Choose a correct answer from the options"}
                        />
                        <br />
                        <FormControl>
                            <InputLabel id="select-correct-response">
                                Correct Response
                            </InputLabel>
                            <Select
                                value={correctResponse || options[0]}
                                labelId="select-correct-response"
                                label="Correct Response"
                                onChange={(e: SelectChangeEvent) =>
                                    setCorrectResponse(e.target.value as string)
                                }
                            >
                                {options.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {replaceFirstAndLast(option)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </>
                ) : null}
            </FormControl>
        </Box>
    );
}

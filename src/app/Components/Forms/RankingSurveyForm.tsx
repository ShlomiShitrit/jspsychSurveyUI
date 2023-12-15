"use client";
import {
    ChangeEvent,
    useEffect,
    Fragment,
    Dispatch,
    SetStateAction,
} from "react";
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
import { reorder } from "@/app/General/types";

export default function RankingSurveyForm<T extends QuestionType>({
    id,
    questionsChangeHandler,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyFormProps<T>) {
    const { rankingValues } = useSurveyForm<T>(id, questionsChangeHandler);

    const {
        prompt,
        name,
        options,
        optionsArray,
        optionsReorder,
        isCorrectResponse,
        correctResponseRanking,
        required,
        surveyType,
        addInput,
        removeInput,
        stateHandler,
        setPrompt,
        setName,
        setOptions,
        setOptionsReorder,
        setIsCorrectResponse,
        setCorrectResponseRanking,
        setRequired,
    } = rankingValues;

    useInputError(
        emptyInputErrors,
        emptyNewErrors,
        isInputErrorHandler,
        inputErrorsHandler,
        prompt,
        name,
        options,
        id,
        "Ranking",
    );

    useEffect(() => {
        if (!isCorrectResponse) {
            setCorrectResponseRanking(null);
        } else {
            setCorrectResponseRanking(options);
        }
    }, [isCorrectResponse]);

    const reorderArray = ["none", "asc", "desc", "random"];
    const reorderArrayDisplay = ["None", "Ascend", "Descend", "Random"];

    const inputArray = [
        {
            state: prompt,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setPrompt(e.target.value),
            labelText: "Prompt",
            inputType: "promptQ",
            toolTip: TOOLTIP_TEXT.prompt,
        },
        {
            state: name,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value),
            labelText: "Name",
            inputType: "nameQ",
            toolTip: TOOLTIP_TEXT.name,
        },
    ];

    return (
        <Box sx={matgin10Style}>
            <FormControl>
                <FormLabel sx={margin15Style}>
                    {FIRST_FORM_LABEL} {surveyType}
                </FormLabel>
                <FormLabel sx={matgin10Style}>{SECOND_FORM_LABEL}</FormLabel>
                {inputArray.map((input, index) => (
                    <Fragment key={index}>
                        <CustomTooltip title={input.toolTip} />
                        <InputTextField
                            id={id + index}
                            errorId={`${id}${index}`}
                            state={input.state}
                            stateHandler={input.stateHandler}
                            labelText={input.labelText}
                            newErrors={newErrors}
                            inputType={input.inputType}
                        />
                        <br />
                    </Fragment>
                ))}
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
                        isState={required}
                        stateHandler={(e: ChangeEvent<HTMLInputElement>) =>
                            setRequired(e.target.checked)
                        }
                        labelText={"Required?"}
                    />
                    <br />
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
                            title={"Set an order for the correct response"}
                        />
                        <br />
                        <OptionsGrid
                            newErrors={newErrors}
                            errorId={`${id}3`}
                            labelText={"Correct response"}
                            optionsQ={correctResponseRanking || []}
                            optionsQChangeHandler={stateHandler(
                                correctResponseRanking || [],
                                setCorrectResponseRanking as Dispatch<
                                    SetStateAction<string[]>
                                >
                            )}
                            optionsArray={optionsArray}
                        />
                    </>
                ) : null}
            </FormControl>
        </Box>
    );
}

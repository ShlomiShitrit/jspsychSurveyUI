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
import PromptGrid from "./PromptGrid";

export default function LikertTableForm<T extends QuestionType>({
    id,
    questionsChangeHandler,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyFormProps<T>) {
    const { likertTableValues } = useSurveyForm<T>(id, questionsChangeHandler);

    const {
        prompt,
        name,
        prompts,
        names,
        options,
        optionsArray,
        required,
        promptsArray,
        nameArray,
        surveyType,
        addInput,
        removeInput,
        stateHandler,
        setPrompt,
        setName,
        setOptions,
        setRequired,
        setPrompts,
        setNames,
        setStatements,
    } = likertTableValues;

    useInputError(
        emptyInputErrors,
        emptyNewErrors,
        isInputErrorHandler,
        inputErrorsHandler,
        prompt,
        name,
        options,
        id,
        "Likert Table"
    );

    useEffect(() => {
        const newStatments = prompts.map((prompt, index) => ({
            prompt,
            name: names[index],
        }));
        setStatements(newStatments);
    }, [prompts, names]);

    const inputArray = [
        {
            state: prompt,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setPrompt(e.target.value),
            labelText: "Prompt",
            inputType: "prompt",
            toolTip: TOOLTIP_TEXT.prompt,
        },
        {
            state: name,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value),
            labelText: "Name",
            inputType: "name",
            toolTip: TOOLTIP_TEXT.name,
        },
    ];

    const promptGridErrorIds = {
        prompt: `${id}${0}`,
        name: `${id}${1}`,
    };

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
                <br />
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
                <Box sx={{ flex: 1 }}>
                    <SwitchLabel
                        isState={required}
                        stateHandler={(e: ChangeEvent<HTMLInputElement>) =>
                            setRequired(e.target.checked)
                        }
                        labelText={"Required?"}
                    />
                    <br />
                </Box>
            </FormControl>
        </Box>
    );
}

import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/index";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import { TextSurveyFormProps } from "@/app/General/interfaces";
import InputTextField from "@/app/Components/Forms/InputTextField";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import useInputError from "@/app/hooks/use-input-error";
import {
    EMPTY_STR,
    TEXT_NAMEQ,
    TEXT_PROMPTQ,
    TEXT_PROMPT_LABEL,
    TEXT_NAME_LABEL,
    TEXT_PLACEHOLDER_LABEL,
    TEXT_FORM_TITLE,
    TEXT_FORM_LABEL,
    TEXT_SWITCH_LABEL,
    TEXT_STYPE,
} from "@/app/General/Resources/FormsRes";
import { INDEX_0 } from "@/app/General/constants";

function TextSurveyForm({
    id = INDEX_0,
    questionsChangeHandler = () => null,
    inputErrorsHandler = () => null,
    newErrors = [],
    isInputErrorHandler = () => null,
    emptyInputErrors = () => null,
    emptyNewErrors = () => null,
}: TextSurveyFormProps) {
    const [prompt, setPrompt] = useState(EMPTY_STR);
    const [placeHolder, setPlaceHolder] = useState(EMPTY_STR);
    const [name, setName] = useState(EMPTY_STR);
    const [required, setRequired] = useState(false);

    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );

    const promptChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };
    const placeHolderChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPlaceHolder(e.target.value);
    };
    const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const requiredChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRequired(e.target.checked);
    };

    const QuestionData = {
        index: id,
        promptQ: prompt,
        nameQ: name,
        required: required,
        placeHolder: placeHolder,
    };

    useEffect(() => {
        questionsChangeHandler(id, QuestionData);
    }, [QuestionData]);

    useInputError(
        emptyInputErrors,
        emptyNewErrors,
        isInputErrorHandler,
        inputErrorsHandler,
        prompt,
        name,
        placeHolder,
        id,
        TEXT_STYPE
    );

    const inputArr = [
        {
            state: prompt,
            label: TEXT_PROMPT_LABEL,
            type: TEXT_PROMPTQ,
            stateHandler: promptChangeHandler,
        },
        {
            state: placeHolder,
            label: TEXT_PLACEHOLDER_LABEL,
            type: TEXT_PROMPTQ,
            stateHandler: placeHolderChangeHandler,
        },
        {
            state: name,
            label: TEXT_NAME_LABEL,
            type: TEXT_NAMEQ,
            stateHandler: nameChangeHandler,
        },
    ];

    return (
        <Box sx={matgin10Style}>
            <FormControl>
                <FormLabel sx={margin15Style}>
                    {TEXT_FORM_TITLE} {surveyType}
                </FormLabel>
                <FormLabel sx={matgin10Style}>{TEXT_FORM_LABEL}</FormLabel>
                {inputArr.map((input, index) => (
                    <InputTextField
                        errorId={`${id}${index}`}
                        key={index}
                        id={index}
                        state={input.state}
                        stateHandler={input.stateHandler}
                        labelText={input.label}
                        inputType={input.type}
                        newErrors={newErrors}
                    />
                ))}
                <SwitchLabel
                    isState={required}
                    stateHandler={requiredChangeHandler}
                    labelText={TEXT_SWITCH_LABEL}
                />
            </FormControl>
        </Box>
    );
}

export default TextSurveyForm;

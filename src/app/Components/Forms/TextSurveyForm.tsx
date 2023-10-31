import { useState, ChangeEvent, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/index";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import { SurveyFormProps, QuestionType } from "@/app/General/interfaces";
import InputTextField from "@/app/Components/Forms/InputTextField";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import useInputError from "@/app/hooks/use-input-error";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
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
    TOOLTIP_TEXT,
} from "@/app/General/Resources/FormsRes";
import { FORM_ID_PROP_DEFAULT_0 } from "@/app/General/constants";

function TextSurveyForm<T extends QuestionType>({
    id = FORM_ID_PROP_DEFAULT_0,
    questionsChangeHandler = () => null,
    inputErrorsHandler = () => null,
    newErrors = [],
    isInputErrorHandler = () => null,
    emptyInputErrors = () => null,
    emptyNewErrors = () => null,
}: SurveyFormProps<T>) {
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
        questionsChangeHandler(id, QuestionData as T);
    }, [QuestionData]);

    useInputError(
        emptyInputErrors,
        emptyNewErrors,
        isInputErrorHandler,
        inputErrorsHandler,
        prompt,
        placeHolder,
        name,
        id,
        TEXT_STYPE
    );

    const inputArr = [
        {
            state: prompt,
            label: TEXT_PROMPT_LABEL,
            type: TEXT_PROMPTQ,
            stateHandler: promptChangeHandler,
            tooltipText: TOOLTIP_TEXT.prompt,
        },
        {
            state: placeHolder,
            label: TEXT_PLACEHOLDER_LABEL,
            type: TEXT_PROMPTQ,
            stateHandler: placeHolderChangeHandler,
            tooltipText: TOOLTIP_TEXT.placeholder,
        },
        {
            state: name,
            label: TEXT_NAME_LABEL,
            type: TEXT_NAMEQ,
            stateHandler: nameChangeHandler,
            tooltipText: TOOLTIP_TEXT.name,
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
                    <Fragment key={index}>
                        <CustomTooltip title={input.tooltipText} />
                        <InputTextField
                            errorId={`${id}${index}`}
                            id={index}
                            state={input.state}
                            stateHandler={input.stateHandler}
                            labelText={input.label}
                            inputType={input.type}
                            newErrors={newErrors}
                        />
                    </Fragment>
                ))}
                <Box sx={{ flex: 1 }}>
                    <SwitchLabel
                        isState={required}
                        stateHandler={requiredChangeHandler}
                        labelText={TEXT_SWITCH_LABEL}
                    />
                    <CustomTooltip title={TOOLTIP_TEXT.switchLabelRequired} />
                </Box>
            </FormControl>
        </Box>
    );
}

export default TextSurveyForm;

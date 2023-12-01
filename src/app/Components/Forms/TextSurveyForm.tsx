import { ChangeEvent, Fragment } from "react";
import useSurveyForm from "@/app/hooks/useSurveyForm";
import { FormControl, FormLabel, Box } from "@/app/General/muiComponents";
import { matgin10Style, margin15Style } from "@/app/General/styles";
import { SurveyFormProps, QuestionType } from "@/app/General/interfaces";
import InputTextField from "@/app/Components/Forms/InputTextField";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import useInputError from "@/app/hooks/useInputError";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
import {
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

function TextSurveyForm<T extends QuestionType>({
    id,
    questionsChangeHandler,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyFormProps<T>) {
    const { textValues } = useSurveyForm<T>(id, questionsChangeHandler);

    const {
        prompt,
        placeHolder,
        name,
        surveyType,
        required,
        setPrompt,
        setName,
        setPlaceHolder,
        setRequired,
    } = textValues;

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
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setPrompt(e.target.value),
            tooltipText: TOOLTIP_TEXT.prompt,
        },
        {
            state: placeHolder,
            label: TEXT_PLACEHOLDER_LABEL,
            type: TEXT_PROMPTQ,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setPlaceHolder(e.target.value),
            tooltipText: TOOLTIP_TEXT.placeholder,
        },
        {
            state: name,
            label: TEXT_NAME_LABEL,
            type: TEXT_NAMEQ,
            stateHandler: (e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value),
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
                        stateHandler={(e: ChangeEvent<HTMLInputElement>) =>
                            setRequired(e.target.checked)
                        }
                        labelText={TEXT_SWITCH_LABEL}
                    />
                    <CustomTooltip title={TOOLTIP_TEXT.switchLabelRequired} />
                </Box>
            </FormControl>
        </Box>
    );
}

export default TextSurveyForm;

"use client";
import { useSelector } from "react-redux";
import { TextField } from "@/app/General/muiComponents";
import { replaceFirstAndLast } from "@/app/General/utils";
import {
    InputTextFieldProps,
    MultiChoiceQuestion,
    LikertQuestion,
    TextSurveyQuestion,
} from "@/app/General/interfaces";
import { formTxtFieldStyle } from "@/app/General/styles";
import { RootState } from "@/app/store/index";

import {
    FORM_ID_PROP_DEFAULT_0,
    FORM_INPUT_INDEX_0,
    FORM_INPUT_ID_PLUS_1,
} from "@/app/General/constants";
import {
    EMPTY_STRING,
    MULTI_CHOICE_STYPE,
    LIKERT_STYPE,
    ERROR_SURVEY_TYPE_MSG,
    TEXTFIELD_VARIANT,
    INPUT_TYPE_OPTIONSQ,
    MULTI_SELECT_STYPE,
    TEXT_STYPE,
} from "@/app/General/Resources/FormsRes";

function InputTextField({
    state,
    id,
    labelText,
    inputType,
    stateHandler,
    newErrors,
    errorId,
}: InputTextFieldProps) {
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );
    const newState =
        inputType === INPUT_TYPE_OPTIONSQ || surveyType === LIKERT_STYPE
            ? replaceFirstAndLast(state, EMPTY_STRING, EMPTY_STRING)
            : state;

    const labelId =
        inputType === INPUT_TYPE_OPTIONSQ || surveyType === LIKERT_STYPE
            ? `${labelText} ${id + FORM_INPUT_ID_PLUS_1}`
            : `${labelText}`;

    const hasKey = newErrors.some((error) => error.hasOwnProperty(errorId));
    const errorMsg = newErrors.find((error) => error.hasOwnProperty(errorId));
    const isRequired = inputType === "preamble" ? false : true;

    return (
        <TextField
            sx={formTxtFieldStyle}
            id={id.toString()}
            label={labelId}
            variant={TEXTFIELD_VARIANT}
            value={newState}
            onChange={stateHandler}
            error={hasKey}
            helperText={hasKey && errorMsg ? errorMsg[errorId] : EMPTY_STRING}
            fullWidth
            required={isRequired}
        />
    );
}

export default InputTextField;

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
    state = EMPTY_STRING,
    id = FORM_ID_PROP_DEFAULT_0,
    labelText = EMPTY_STRING,
    inputType = EMPTY_STRING,
    stateHandler = () => null,
    newErrors = [],
    errorId = EMPTY_STRING,
}: InputTextFieldProps) {
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );

    let stateQ: string;
    switch (surveyType) {
        case MULTI_CHOICE_STYPE:
            stateQ = useSelector(
                (state: RootState) =>
                    state.multiChoice[FORM_INPUT_INDEX_0][
                        inputType as keyof MultiChoiceQuestion
                    ] as string
            );
            break;
        case LIKERT_STYPE:
            stateQ = useSelector((state: RootState) => {
                const stateArr = state.likert[FORM_INPUT_INDEX_0][
                    inputType as keyof LikertQuestion
                ] as string[];
                return stateArr[id];
            });
            break;
        case MULTI_SELECT_STYPE:
            stateQ = useSelector(
                (state: RootState) =>
                    state.multiSelect[FORM_INPUT_INDEX_0][
                        inputType as keyof MultiChoiceQuestion
                    ] as string
            );
            break;
        case TEXT_STYPE:
            stateQ = useSelector(
                (state: RootState) =>
                    state.text[FORM_INPUT_INDEX_0][
                        inputType as keyof TextSurveyQuestion
                    ] as string
            );
            break;
        default:
            throw new Error(ERROR_SURVEY_TYPE_MSG);
    }

    let newState = state;
    if (inputType === INPUT_TYPE_OPTIONSQ || surveyType === LIKERT_STYPE) {
        newState = replaceFirstAndLast(state, EMPTY_STRING, EMPTY_STRING);
    }

    const labelId =
        inputType === INPUT_TYPE_OPTIONSQ || surveyType === LIKERT_STYPE
            ? `${labelText} ${id + FORM_INPUT_ID_PLUS_1}`
            : `${labelText}`;

    const hasKey = newErrors.some((error) => error.hasOwnProperty(errorId));

    const errorMsg = newErrors.find((error) => error.hasOwnProperty(errorId));
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
            required
        />
    );
}

export default InputTextField;

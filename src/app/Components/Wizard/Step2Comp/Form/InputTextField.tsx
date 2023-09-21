"use client";
import { useSelector } from "react-redux";
import { TextField } from "@/app/General/muiComponents";
import { replaceFirstAndLast } from "@/app/General/utils";
import {
    InputTextFieldProps,
    MultiChoiceQuestion,
    LikertQuestion,
} from "@/app/General/interfaces";
import { formTxtFieldStyle } from "@/app/General/styles";
import { RootState } from "@/app/store/index";

import {
    FORM_INPUT_ID_PROP,
    FORM_INPUT_INDEX_0,
    FORM_INPUT_ID_PLUS_1,
} from "@/app/General/constants";
import {
    EMPTY_STRING,
    MULTI_CHOICE_STYPE,
    LIKERT_STYPE,
    ERROR_SURVEY_TYPE_MSG,
    TEXTFIELD_VARIANT,
} from "@/app/General/Resources/Step2FormRes";

function InputTextField({
    state = EMPTY_STRING,
    id = FORM_INPUT_ID_PROP,
    labelText = EMPTY_STRING,
    inputType = EMPTY_STRING,
    stateHandler = () => null,
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
        default:
            throw new Error(ERROR_SURVEY_TYPE_MSG);
    }

    let stateRep = EMPTY_STRING;
    if (state) {
        stateRep = replaceFirstAndLast(state, EMPTY_STRING, EMPTY_STRING);
    }

    return (
        <TextField
            sx={formTxtFieldStyle}
            id={id.toString()}
            label={`${labelText} ${id + FORM_INPUT_ID_PLUS_1}`}
            variant={TEXTFIELD_VARIANT}
            value={stateRep ? stateRep : stateQ}
            onChange={stateHandler}
            fullWidth
        />
    );
}

export default InputTextField;

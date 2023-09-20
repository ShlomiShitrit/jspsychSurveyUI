"use client";
import { useSelector } from "react-redux";
import { TextField } from "@/app/General/muiComponents";

import { RootState } from "@/app/store/index";
import { formTxtFieldStyle } from "@/app/General/styles";
import { NameInputProps } from "@/app/General/interfaces";
import {
    FORM_INPUT_ID_PROP,
    FORM_INPUT_INDEX_0,
    FORM_INPUT_SLICE_1,
    FORM_INPUT_SLICE_1_MINUS,
    FORM_INPUT_ID_PLUS_1,
} from "@/app/General/constants";
import {
    EMPTY_STRING,
    MULTI_CHOICE_STYPE,
    LIKERT_STYPE,
    ERROR_SURVEY_TYPE_MSG,
    TEXTFIELD_OPTION_ID,
    TEXTFIELD_VARIANT,
} from "@/app/General/Resources/Step2FormRes";

function PromptInput({
    state = EMPTY_STRING,
    stateHandler = () => null,
    id = FORM_INPUT_ID_PROP,
    labelText = EMPTY_STRING,
}: NameInputProps) {
    const replaceFirstAndLast = (
        inputString: string,
        newFirstChar: string,
        newLastChar: string
    ) => {
        const replacedString =
            newFirstChar +
            inputString.slice(FORM_INPUT_SLICE_1, FORM_INPUT_SLICE_1_MINUS) +
            newLastChar;
        return replacedString;
    };
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );

    const optionQ = useSelector((state: RootState) => {
        const option = state.multiChoice[FORM_INPUT_INDEX_0].optionsQ[id];
        if (option) {
            return replaceFirstAndLast(option, EMPTY_STRING, EMPTY_STRING);
        }
    }) as string;

    const labelQ = useSelector(
        (state: RootState) => state.likert[FORM_INPUT_INDEX_0].optionsQ[id]
    );

    let stateQ: string;
    switch (surveyType) {
        case MULTI_CHOICE_STYPE:
            stateQ = optionQ;
            break;
        case LIKERT_STYPE:
            stateQ = labelQ;
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
            id={TEXTFIELD_OPTION_ID}
            label={`${labelText} ${id + FORM_INPUT_ID_PLUS_1}`}
            variant={TEXTFIELD_VARIANT}
            value={stateRep ? stateRep : stateQ}
            onChange={stateHandler}
            fullWidth
        />
    );
}

export default PromptInput;

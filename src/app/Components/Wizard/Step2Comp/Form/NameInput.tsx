"use client";
import { useSelector } from "react-redux";
import { TextField } from "@/app/General/muiComponents";
import { RootState } from "@/app/store/index";
import { NameInputProps } from "@/app/General/interfaces";
import { formTxtFieldStyle } from "@/app/General/styles";
import {
    FORM_INPUT_ID_PROP,
    FORM_INPUT_INDEX_0,
    FORM_INPUT_SLICE_1,
    FORM_INPUT_SLICE_1_MINUS,
} from "@/app/General/constants";
import {
    MULTI_CHOICE_STYPE,
    LIKERT_STYPE,
    EMPTY_STRING,
    TEXTFIELD_NAME_LABEL,
    TEXTFIELD_VARIANT,
    ERROR_SURVEY_TYPE_MSG,
} from "@/app/General/Resources/Step2FormRes";

function PromptInput({
    state = EMPTY_STRING,
    stateHandler = () => null,
    id = FORM_INPUT_ID_PROP,
}: NameInputProps) {
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );
    const nameQMultiChoice = useSelector(
        (state: RootState) => state.multiChoice[FORM_INPUT_INDEX_0].nameQ
    );
    const nameQLikert = useSelector(
        (state: RootState) => state.likert[FORM_INPUT_INDEX_0].nameQ[id]
    );

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

    let nameQ: string;
    switch (surveyType) {
        case MULTI_CHOICE_STYPE:
            nameQ = nameQMultiChoice;
            break;
        case LIKERT_STYPE:
            nameQ = nameQLikert;
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
            label={TEXTFIELD_NAME_LABEL}
            variant={TEXTFIELD_VARIANT}
            value={stateRep ? stateRep : nameQ}
            onChange={stateHandler}
        />
    );
}

export default PromptInput;

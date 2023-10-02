import {
    FORM_INPUT_SLICE_1,
    FORM_INPUT_SLICE_1_MINUS,
} from "@/app/General/constants";

export const replaceFirstAndLast = (
    inputString: string,
    newFirstChar: string = "",
    newLastChar: string = ""
) => {
    const replacedString =
        newFirstChar +
        inputString.slice(FORM_INPUT_SLICE_1, FORM_INPUT_SLICE_1_MINUS) +
        newLastChar;
    return replacedString;
};

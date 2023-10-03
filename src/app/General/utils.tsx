import { UTILS_INDEX_1, UTILS_INDEX_MINUS_1 } from "@/app/General/constants";
import { UTILS_EMPTY_STR } from "@/app/General/Resources/OtherRes";

export const replaceFirstAndLast = (
    inputString: string,
    newFirstChar: string = UTILS_EMPTY_STR,
    newLastChar: string = UTILS_EMPTY_STR
) => {
    const replacedString =
        newFirstChar +
        inputString.slice(UTILS_INDEX_1, UTILS_INDEX_MINUS_1) +
        newLastChar;
    return replacedString;
};

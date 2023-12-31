import { useEffect } from "react";
import { replaceFirstAndLast } from "@/app/General/utils";
import {
    HOOKS_INDEX_0,
    HOOKS_INDEX_1,
    HOOKS_INDEX_2,
    HOOKS_ARR_LEN_0,
    HOOKS_ARR_LEN_2,
} from "@/app/General/constants";
import {
    EMPTY_STRING,
    INPUT_ERR_ID_0,
    INPUT_ERR_ID_1,
    INPUT_ERR_ID_2,
    INPUT_ERR_MSG_REQ,
    INPUT_ERR_MSG_OPTIONS,
    INPUT_ERR_MSG_PROMPT,
    INPUT_ERR_MSG_NAME,
    MULTI_CHOICE_STYPE,
    LIKERT_STYPE,
    TEXT_STYPE,
} from "@/app/General/Resources/FormsRes";

function useInputError(
    emptyInputErrors: () => void,
    emptyNewErrors: () => void,
    isInputErrorHandler: (value: boolean) => void,
    inputErrorsHandler: (key: string, value: string) => void,
    state1: string | string[],
    state2: string | string[],
    state3: string | string[],
    id: number,
    formType: string
) {
    useEffect(() => {
        emptyInputErrors();
        emptyNewErrors();
        let isState1Empty: boolean = false;
        let isState2Empty: boolean = false;
        let isState3Empty: boolean = false;
        let errorObj: { [key: string]: string } = {};
        const state1S = state1 as string;
        const state2S = state2 as string;
        const state3S = state3 as string;
        const state1L = state1 as string[];
        const state2L = state2 as string[];
        const state3L = state3 as string[];
        switch (formType) {
            case MULTI_CHOICE_STYPE:
                isState1Empty = state1S.trim() === EMPTY_STRING;
                isState2Empty = state2S.trim() === EMPTY_STRING;
                isState3Empty =
                    state3L.length < HOOKS_ARR_LEN_2 ||
                    replaceFirstAndLast(state3L[HOOKS_INDEX_0]) ===
                        EMPTY_STRING ||
                    replaceFirstAndLast(state3L[HOOKS_INDEX_1]) ===
                        EMPTY_STRING;

                errorObj = {
                    [`${id}${INPUT_ERR_ID_0}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_1}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_2}`]: INPUT_ERR_MSG_OPTIONS,
                };
                break;
            case LIKERT_STYPE:
                isState1Empty =
                    state1L.length === HOOKS_ARR_LEN_0 ||
                    replaceFirstAndLast(state1L[HOOKS_INDEX_0]) ===
                        EMPTY_STRING;
                isState2Empty =
                    state2L.length === HOOKS_ARR_LEN_0 ||
                    replaceFirstAndLast(state2L[HOOKS_INDEX_0]) ===
                        EMPTY_STRING;
                isState3Empty =
                    state3L.length < HOOKS_ARR_LEN_2 ||
                    replaceFirstAndLast(state3L[HOOKS_INDEX_0]) ===
                        EMPTY_STRING ||
                    replaceFirstAndLast(state3L[HOOKS_INDEX_1]) ===
                        EMPTY_STRING;

                errorObj = {
                    [`${id}${INPUT_ERR_ID_0}`]: INPUT_ERR_MSG_PROMPT,
                    [`${id}${INPUT_ERR_ID_1}`]: INPUT_ERR_MSG_NAME,
                    [`${id}${INPUT_ERR_ID_2}`]: INPUT_ERR_MSG_OPTIONS,
                };
                break;
            case TEXT_STYPE:
                isState1Empty = state1S.trim() === EMPTY_STRING;
                isState2Empty = state2S.trim() === EMPTY_STRING;
                isState3Empty = state3S.trim() === EMPTY_STRING;

                errorObj = {
                    [`${id}${INPUT_ERR_ID_0}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_1}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_2}`]: INPUT_ERR_MSG_REQ,
                };
                break;
            case "html":
                isState1Empty = state1S.trim() === EMPTY_STRING;
                isState2Empty = state2S.trim() === EMPTY_STRING;
                isState3Empty = state3S.trim() === EMPTY_STRING;

                errorObj = {
                    [`${id}${INPUT_ERR_ID_0}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_1}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_2}`]: INPUT_ERR_MSG_REQ,
                };
                break;
            case "Likert Scale":
                isState1Empty = state1S.trim() === EMPTY_STRING;
                isState2Empty = state2S.trim() === EMPTY_STRING;
                isState3Empty = state3S.trim() === EMPTY_STRING;

                errorObj = {
                    [`${id}${INPUT_ERR_ID_0}`]: INPUT_ERR_MSG_PROMPT,
                    [`${id}${INPUT_ERR_ID_1}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_2}`]: INPUT_ERR_MSG_REQ,
                };
                break;
            case "Ranking":
                isState1Empty = state1S.trim() === EMPTY_STRING;
                isState2Empty = state2S.trim() === EMPTY_STRING;
                isState3Empty =
                    state3L.length < HOOKS_ARR_LEN_2 ||
                    replaceFirstAndLast(state3L[HOOKS_INDEX_0]) ===
                        EMPTY_STRING ||
                    replaceFirstAndLast(state3L[HOOKS_INDEX_1]) ===
                        EMPTY_STRING;
                errorObj = {
                    [`${id}${INPUT_ERR_ID_0}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_1}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_2}`]: INPUT_ERR_MSG_OPTIONS,
                };
                break;
            case "Likert Table":
                isState1Empty = state1S.trim() === EMPTY_STRING;
                isState2Empty = state2S.trim() === EMPTY_STRING;
                isState3Empty =
                    state3L.length < HOOKS_ARR_LEN_2 ||
                    replaceFirstAndLast(state3L[HOOKS_INDEX_0]) ===
                        EMPTY_STRING ||
                    replaceFirstAndLast(state3L[HOOKS_INDEX_1]) ===
                        EMPTY_STRING;
                errorObj = {
                    [`${id}${INPUT_ERR_ID_0}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_1}`]: INPUT_ERR_MSG_REQ,
                    [`${id}${INPUT_ERR_ID_2}`]: INPUT_ERR_MSG_OPTIONS,
                };
            default:
                break;
        }
        const errorObjKeys = Object.keys(errorObj);
        const errorObjValues = Object.values(errorObj);
        if (isState1Empty) {
            isInputErrorHandler(true);
            inputErrorsHandler(
                errorObjKeys[HOOKS_INDEX_0],
                errorObjValues[HOOKS_INDEX_0]
            );
        } else if (isState2Empty) {
            isInputErrorHandler(true);
            inputErrorsHandler(
                errorObjKeys[HOOKS_INDEX_1],
                errorObjValues[HOOKS_INDEX_1]
            );
        } else if (isState3Empty) {
            isInputErrorHandler(true);
            inputErrorsHandler(
                errorObjKeys[HOOKS_INDEX_2],
                errorObjValues[HOOKS_INDEX_2]
            );
        } else {
            isInputErrorHandler(false);
            emptyInputErrors();
            emptyNewErrors();
        }
    }, [state1, state2, state3]);
}

export default useInputError;

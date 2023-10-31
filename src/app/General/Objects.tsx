import {
    MultiChoiceQuestion,
    LikertQuestion,
    TextSurveyQuestion,
    TextSurveyState,
} from "@/app/General/interfaces";

import { OBJ_INDEX_0 } from "@/app/General/constants";
import { EMPTY_STRING } from "@/app/General/Resources/OtherRes";

export const mcParamsObj: MultiChoiceQuestion = {
    index: OBJ_INDEX_0,
    promptQ: EMPTY_STRING,
    nameQ: EMPTY_STRING,
    optionsQ: [],
    required: false,
    horizontal: false,
};
export const likertParamsObj: LikertQuestion = {
    index: OBJ_INDEX_0,
    promptQ: [],
    nameQ: [],
    optionsQ: [],
    randomQ: false,
};

export const textParamsObj: TextSurveyQuestion = {
    index: OBJ_INDEX_0,
    promptQ: EMPTY_STRING,
    nameQ: EMPTY_STRING,
    required: false,
    placeHolder: EMPTY_STRING,
    preamble: EMPTY_STRING,
};

export const initialMultiChoiceSurveyState = [
    {
        index: OBJ_INDEX_0,
        promptQ: EMPTY_STRING,
        nameQ: EMPTY_STRING,
        optionsQ: [],
        required: false,
        horizontal: false,
    },
] as MultiChoiceQuestion[];

export const initialLikertSurveyState = [
    {
        index: OBJ_INDEX_0,
        promptQ: [],
        nameQ: [],
        optionsQ: [],
        randomQ: false,
    },
] as LikertQuestion[];

export const initialTextSurveyState = {
    preamble: EMPTY_STRING,
    textQuestions: [
        {
            index: OBJ_INDEX_0,
            promptQ: EMPTY_STRING,
            nameQ: EMPTY_STRING,
            required: false,
            placeHolder: EMPTY_STRING,
        },
    ] as TextSurveyQuestion[],
} as TextSurveyState;

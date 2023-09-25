import {
    MultiChoiceQuestion,
    LikertQuestion,
    TextSurveyQuestion,
} from "@/app/General/interfaces";

import {
    WIZRAD_DIALOG_INDEX_0,
    OBJECTS_INDEX_0,
} from "@/app/General/constants";
import { EMPTY_STRING } from "@/app/General/Resources/OtherRes";

export const mcParamsObj: MultiChoiceQuestion = {
    index: WIZRAD_DIALOG_INDEX_0,
    promptQ: EMPTY_STRING,
    nameQ: EMPTY_STRING,
    optionsQ: [],
    required: false,
    horizontal: false,
};
export const likertParamsObj: LikertQuestion = {
    index: WIZRAD_DIALOG_INDEX_0,
    promptQ: [],
    nameQ: [],
    optionsQ: [],
    randomQ: false,
};

export const textParamsObj: TextSurveyQuestion = {
    index: OBJECTS_INDEX_0,
    promptQ: EMPTY_STRING,
    nameQ: EMPTY_STRING,
    required: false,
    placeHolder: EMPTY_STRING,
};

export const initialMultiChoiceSurveyState = [
    {
        index: OBJECTS_INDEX_0,
        promptQ: EMPTY_STRING,
        nameQ: EMPTY_STRING,
        optionsQ: [],
        required: false,
        horizontal: false,
    },
] as MultiChoiceQuestion[];

export const initialLikertSurveyState = [
    {
        index: OBJECTS_INDEX_0,
        promptQ: [],
        nameQ: [],
        optionsQ: [],
        randomQ: false,
    },
] as LikertQuestion[];

export const initialTextSurveyState = [
    {
        index: OBJECTS_INDEX_0,
        promptQ: EMPTY_STRING,
        nameQ: EMPTY_STRING,
        required: false,
        placeHolder: EMPTY_STRING,
    },
] as TextSurveyQuestion[];

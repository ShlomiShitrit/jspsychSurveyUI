import {
    MultiChoiceQuestion,
    LikertQuestion,
    TextSurveyQuestion,
    TextSurveyState,
    HtmlSurveyQuestion,
    LikertScaleQuestion,
    DropdownSurveyQuestion,
    RankingSurveyQuestion,
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

export const htmlParamsObj: HtmlSurveyQuestion = {
    index: OBJ_INDEX_0,
    html: EMPTY_STRING,
    preamble: EMPTY_STRING,
    buttonLabel: EMPTY_STRING,
};

export const likertScaleParamsObj: LikertScaleQuestion = {
    index: OBJ_INDEX_0,
    prompt: EMPTY_STRING,
    minLabel: EMPTY_STRING,
    maxLabel: EMPTY_STRING,
    values: [],
};

export const dropdownParamsObj = {
    index: OBJ_INDEX_0,
    prompt: "",
    options: [],
    optionsReorder: "",
    correctResponse: "",
};

export const rankingParamsObj: RankingSurveyQuestion = {
    index: OBJ_INDEX_0,
    prompt: "",
    name: "",
    options: [],
    optionsReorder: "",
    correctResponse: "",
    required: false,
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

export const initialHtmlSurveyState = [
    {
        index: OBJ_INDEX_0,
        html: EMPTY_STRING,
        preamble: EMPTY_STRING,
        buttonLabel: EMPTY_STRING,
    },
] as HtmlSurveyQuestion[];

export const initialLikertScaleSurveyState = [
    {
        index: OBJ_INDEX_0,
        prompt: EMPTY_STRING,
        minLabel: EMPTY_STRING,
        maxLabel: EMPTY_STRING,
        values: [],
    },
] as LikertScaleQuestion[];

export const initialDropdownSurveyState = [
    {
        index: OBJ_INDEX_0,
        prompt: "",
        options: [],
        optionsReorder: "",
        correctResponse: "",
    },
] as DropdownSurveyQuestion[];

export const initialRankingSurveyState = [
    {
        index: OBJ_INDEX_0,
        prompt: "",
        name: "",
        options: [],
        optionsReorder: "",
        correctResponse: "",
        required: false,
    },
] as RankingSurveyQuestion[];

"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MultiChoiceQuestion } from "@/app/General/interfaces";
import { STORE_INDEX_0 } from "@/app/General/constants";
import {
    MC_SLICE_NAME,
    STORE_EMPTY_STR,
} from "@/app/General/Resources/StoreRes";

const initialMultiChoiceSurveyState = [
    {
        index: STORE_INDEX_0,
        promptQ: STORE_EMPTY_STR,
        nameQ: STORE_EMPTY_STR,
        optionsQ: [],
        required: false,
        horizontal: false,
    },
] as MultiChoiceQuestion[];

export const multiChoiceSlice = createSlice({
    name: MC_SLICE_NAME,
    initialState: initialMultiChoiceSurveyState,
    reducers: {
        addQuestion(state, action: PayloadAction<MultiChoiceQuestion>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const multiChoiceActions = multiChoiceSlice.actions;

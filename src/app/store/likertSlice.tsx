"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LIKERT_SLICE_NAME } from "@/app/General/Resources/StoreRes";
import { STORE_INDEX_0 } from "@/app/General/constants";
import { LikertQuestion } from "@/app/General/interfaces";

const initialLikertSurveyState = [
    {
        index: STORE_INDEX_0,
        promptQ: [],
        nameQ: [],
        optionsQ: [],
        randomQ: false,
    },
] as LikertQuestion[];

export const likertSlice = createSlice({
    name: LIKERT_SLICE_NAME,
    initialState: initialLikertSurveyState,
    reducers: {
        addQuestion(state, action: PayloadAction<LikertQuestion>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const likertActions = likertSlice.actions;

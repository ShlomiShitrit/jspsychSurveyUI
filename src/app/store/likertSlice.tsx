"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialLikertSurveyState } from "@/app/General/Objects";
import { LIKERT_SLICE_NAME } from "@/app/General/Resources/OtherRes";
import { LikertQuestion } from "@/app/General/interfaces";

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

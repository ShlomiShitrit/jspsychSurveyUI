"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialMultiChoiceSurveyState } from "@/app/General/Objects";
import { MultiChoiceQuestion } from "@/app/General/interfaces";
import { MC_SLICE_NAME } from "@/app/General/Resources/StoreRes";

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

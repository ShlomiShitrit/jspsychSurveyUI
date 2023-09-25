"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialMultiChoiceSurveyState } from "@/app/General/Objects";
import { MultiChoiceQuestion } from "@/app/General/interfaces";
import { MS_SLICE_NAME } from "@/app/General/Resources/OtherRes";

export const multiSelectSlice = createSlice({
    name: MS_SLICE_NAME,
    initialState: initialMultiChoiceSurveyState,
    reducers: {
        addQuestion(state, action: PayloadAction<MultiChoiceQuestion>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const multiSelectActions = multiSelectSlice.actions;

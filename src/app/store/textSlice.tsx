"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialTextSurveyState } from "@/app/General/Objects";
import { TextSurveyQuestion } from "@/app/General/interfaces";
import { TEXT_SLICE_NAME } from "@/app/General/Resources/OtherRes";

export const textSlice = createSlice({
    name: TEXT_SLICE_NAME,
    initialState: initialTextSurveyState,
    reducers: {
        addQuestion(state, action: PayloadAction<TextSurveyQuestion>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const textActions = textSlice.actions;

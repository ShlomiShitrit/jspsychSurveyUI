"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialLikertScaleSurveyState } from "@/app/General/Objects";
import { LikertScaleQuestion } from "@/app/General/interfaces";

export const likertScaleSlice = createSlice({
    name: "likertScale",
    initialState: initialLikertScaleSurveyState,
    reducers: {
        addQuestion(state, action: PayloadAction<LikertScaleQuestion>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const likertScaleActions = likertScaleSlice.actions;

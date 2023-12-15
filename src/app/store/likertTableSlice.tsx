"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialLikertTableSurveyState } from "@/app/General/Objects";
import { LikertTableQuestion } from "@/app/General/interfaces";

export const likertTableSlice = createSlice({
    name: "likertTable",
    initialState: initialLikertTableSurveyState,
    reducers: {
        addQuestion(state, action: PayloadAction<LikertTableQuestion>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const likertTableActions = likertTableSlice.actions;

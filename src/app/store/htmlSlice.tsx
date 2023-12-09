"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialHtmlSurveyState } from "@/app/General/Objects";
import { HtmlSurveyQuestion } from "@/app/General/interfaces";

export const htmlSlice = createSlice({
    name: "html",
    initialState: initialHtmlSurveyState,
    reducers: {
        addQuestion(state, action: PayloadAction<HtmlSurveyQuestion>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const htmlActions = htmlSlice.actions;

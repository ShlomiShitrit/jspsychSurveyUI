"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialDropdownSurveyState } from "@/app/General/Objects";
import { DropdownSurveyQuestion } from "@/app/General/interfaces";

export const dropdownSlice = createSlice({
    name: "dropdown",
    initialState: initialDropdownSurveyState,
    reducers: {
        addQuestion(state, action: PayloadAction<DropdownSurveyQuestion>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const dropdownActions = dropdownSlice.actions;

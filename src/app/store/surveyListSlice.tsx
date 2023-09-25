"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItemObj } from "@/app/General/interfaces";
import { SURVEY_LIST_SLICE_NAME } from "@/app/General/Resources/StoreRes";

export const surveyListSlice = createSlice({
    name: SURVEY_LIST_SLICE_NAME,
    initialState: [] as ListItemObj[],
    reducers: {
        addSurvey(state, action: PayloadAction<ListItemObj>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const surveyListActions = surveyListSlice.actions;

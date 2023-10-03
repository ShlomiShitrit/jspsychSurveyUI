"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItemObj } from "@/app/General/interfaces";
import { SURVEY_LIST_SLICE_NAME } from "@/app/General/Resources/OtherRes";
import { STORE_INDEX_1 } from "@/app/General/constants";

export const surveyListSlice = createSlice({
    name: SURVEY_LIST_SLICE_NAME,
    initialState: [] as ListItemObj[],
    reducers: {
        addSurvey(state, action: PayloadAction<ListItemObj>) {
            state[action.payload.index] = action.payload;
        },
        removeSurvey(state, action: PayloadAction<number>) {
            state.splice(action.payload, STORE_INDEX_1);
        },
    },
});

export const surveyListActions = surveyListSlice.actions;

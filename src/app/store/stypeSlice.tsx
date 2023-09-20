"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
    STYPE_SLICE_NAME,
    STYPE_INIT_STATE,
} from "@/app/General/Resources/StoreRes";

const initialStypeState = { surveyType: STYPE_INIT_STATE };

export const stypeSlice = createSlice({
    name: STYPE_SLICE_NAME,
    initialState: initialStypeState,
    reducers: {
        setStype(state, action) {
            state.surveyType = action.payload;
        },
    },
});

export const stypeActions = stypeSlice.actions;

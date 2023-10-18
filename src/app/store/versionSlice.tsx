"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const versionSlice = createSlice({
    name: "version",
    initialState: { version: "" },
    reducers: {
        changeVersion(state, action) {
            state = action.payload;
        },
    },
});

export const versionActions = versionSlice.actions;

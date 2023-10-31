"use client";
import { createSlice } from "@reduxjs/toolkit";

export const versionSlice = createSlice({
    name: "version",
    initialState: { version: "7.3" },
    reducers: {
        changeVersion(state, action) {
            state.version = action.payload;
        },
    },
});

export const versionActions = versionSlice.actions;

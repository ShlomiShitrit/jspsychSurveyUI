"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialRankingSurveyState } from "@/app/General/Objects";
import { RankingSurveyQuestion } from "@/app/General/interfaces";

export const rankingSlice = createSlice({
    name: "ranking",
    initialState: initialRankingSurveyState,
    reducers: {
        addQuestion(state, action: PayloadAction<RankingSurveyQuestion>) {
            state[action.payload.index] = action.payload;
        },
    },
});

export const rankingActions = rankingSlice.actions;

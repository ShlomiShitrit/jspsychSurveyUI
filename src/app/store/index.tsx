"use client";
import { configureStore } from "@reduxjs/toolkit";

import { stypeSlice } from "@/app/store/stypeSlice";
import { multiChoiceSlice } from "@/app/store/multiChoiceSlice";
import { likertSlice } from "@/app/store/likertSlice";
import { surveyListSlice } from "@/app/store/surveyListSlice";

const store = configureStore({
    reducer: {
        stype: stypeSlice.reducer,
        multiChoice: multiChoiceSlice.reducer,
        likert: likertSlice.reducer,
        surveyList: surveyListSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

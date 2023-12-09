"use client";
import { configureStore } from "@reduxjs/toolkit";

import { stypeSlice } from "@/app/store/stypeSlice";
import { multiChoiceSlice } from "@/app/store/multiChoiceSlice";
import { multiSelectSlice } from "@/app/store/multiSelectSlice";
import { likertSlice } from "@/app/store/likertSlice";
import { surveyListSlice } from "@/app/store/surveyListSlice";
import { textSlice } from "@/app/store/textSlice";
import { versionSlice } from "@/app/store/versionSlice";
import { htmlSlice } from "@/app/store/htmlSlice";

const store = configureStore({
    reducer: {
        stype: stypeSlice.reducer,
        multiChoice: multiChoiceSlice.reducer,
        likert: likertSlice.reducer,
        surveyList: surveyListSlice.reducer,
        multiSelect: multiSelectSlice.reducer,
        text: textSlice.reducer,
        version: versionSlice.reducer,
        html: htmlSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

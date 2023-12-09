"use client";
import { useState, useEffect } from "react";
import useQuestionsChangeHandler from "@/app/hooks/useQuestionsChangeHandler";
import { QuestionType } from "@/app/General/interfaces";
import {
    STYPE_COUNTER_STATE_DEFAULT_1,
    STYPE_ARRAY_STATE_DEFAULT_0,
    STYPE_COUNTER_PLUS_1,
} from "@/app/General/constants";

export default function useSurveyType<T extends QuestionType>(
    onSurveyParams: (params: T[]) => void
) {
    const [formsCount, setFormsCount] = useState(STYPE_COUNTER_STATE_DEFAULT_1);
    const [formsArray, setFormsArray] = useState<number[]>(
        STYPE_ARRAY_STATE_DEFAULT_0
    );

    const { questions, questionsChangeHandler } = useQuestionsChangeHandler<T>(
        []
    );

    const addForm = () => {
        setFormsCount((prevState) => prevState + STYPE_COUNTER_PLUS_1);
        setFormsArray([...formsArray, formsCount]);
    };

    useEffect(() => {
        onSurveyParams(questions);
    }, [questions]);

    return {
        questionsChangeHandler,
        formsArray,
        addForm,
    };
}

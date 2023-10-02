"use client";
import { useState, useEffect, Fragment } from "react";
import { Grid, Button } from "@/app/General/muiComponents";
import {
    STYPE_COUNTER_STATE_DEFAULT_1,
    STYPE_ARRAY_STATE_DEFAULT_0,
    STYPE_COUNTER_PLUS_1,
    GRID_CONT_SPAC_2,
    GRID_ITEM_12,
} from "@/app/General/constants";
import {
    ADD_BTN_VARIANT,
    ADD_BTN_TXT,
} from "@/app/General/Resources/SurveyTypesRes";
import {
    SurveyTypeProps,
    LikertQuestion,
    QuestionTypeArr,
} from "@/app/General/interfaces";
import LikertForm from "@/app/Components/Forms/LikertForm";
import useQuestionsChangeHandler from "@/app/hooks/use-questions-change-handler";

function Likert({
    onSurveyParams = () => null,
    inputErrorsHandler = () => null,
    newErrors = [],
    isInputErrorHandler = () => null,
    emptyInputErrors = () => null,
    emptyNewErrors = () => null,
}: SurveyTypeProps) {
    const [formsCount, setFormsCount] = useState(STYPE_COUNTER_STATE_DEFAULT_1);
    const [formsArray, setFormsArray] = useState<number[]>(
        STYPE_ARRAY_STATE_DEFAULT_0
    );

    const { questions, questionsChangeHandler } =
        useQuestionsChangeHandler<LikertQuestion>([]);

    const addForm = () => {
        setFormsCount((prevState) => prevState + STYPE_COUNTER_PLUS_1);
        setFormsArray([...formsArray, formsCount]);
    };

    useEffect(() => {
        onSurveyParams(questions);
    }, [questions]);

    return (
        <Fragment>
            <Grid container spacing={GRID_CONT_SPAC_2}>
                {formsArray.map((optionIndex) => (
                    <Grid
                        item
                        xs={GRID_ITEM_12}
                        sm={GRID_ITEM_12}
                        md={GRID_ITEM_12}
                        key={optionIndex}
                    >
                        <LikertForm<LikertQuestion>
                            id={optionIndex}
                            questionsChangeHandler={questionsChangeHandler}
                            inputErrorsHandler={inputErrorsHandler}
                            newErrors={newErrors}
                            isInputErrorHandler={isInputErrorHandler}
                            emptyInputErrors={emptyInputErrors}
                            emptyNewErrors={emptyNewErrors}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button variant={ADD_BTN_VARIANT} onClick={addForm}>
                {ADD_BTN_TXT}
            </Button>
        </Fragment>
    );
}

export default Likert;

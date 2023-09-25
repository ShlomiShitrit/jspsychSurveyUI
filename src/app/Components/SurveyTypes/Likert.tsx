"use client";
import { useState, useEffect, Fragment } from "react";
import { Grid, Button } from "@/app/General/muiComponents";
import {
    COUNTER_1,
    INDEX_0,
    COUNTER_PLUS_1,
    GRID_CONT_SPAC_2,
    GRID_ITEM_12,
} from "@/app/General/constants";
import {
    ADD_BTN_VARIANT,
    ADD_BTN_TXT,
} from "@/app/General/Resources/Step2SurveyTypeRes";
import { LikertProps, LikertQuestion } from "@/app/General/interfaces";
import LikertForm from "@/app/Components/Forms/LikertForm";

function Likert({ onSurveyParams = () => null }: LikertProps) {
    const [questions, setQuestions] = useState<LikertQuestion[]>([]);
    const [formsCount, setFormsCount] = useState(COUNTER_1);
    const [formsArray, setFormsArray] = useState<number[]>([INDEX_0]);

    const questionsChangeHandler = (
        index: number,
        question: LikertQuestion
    ) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = question;
        setQuestions(updatedQuestions);
    };

    const addForm = () => {
        setFormsCount((prevState) => prevState + COUNTER_PLUS_1);
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
                        <LikertForm
                            id={optionIndex}
                            questionsChangeHandler={questionsChangeHandler}
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

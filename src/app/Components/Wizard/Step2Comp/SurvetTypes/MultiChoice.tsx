"use client";
import { useState, useEffect, Fragment } from "react";
import { Grid, Button } from "@/app/General/muiComponents";
import {
    MultiChoiceProps,
    MultiChoiceQuestion,
} from "@/app/General/interfaces";
import MultiChoiceForm from "@/app/Components/Wizard/Step2Comp/Form/MultiChoiceForm";
import {
    ADD_BTN_TXT,
    ADD_BTN_VARIANT,
} from "@/app/General/Resources/Step2FormRes";
import {
    GRID_ITEM_12,
    GRID_CONT_SPAC_2,
    COUNTER_PLUS_1,
    COUNTER_1,
    INDEX_0,
} from "@/app/General/constants";

function MultiChoice({ onSurveyParams = () => null }: MultiChoiceProps) {
    const [questions, setQuestions] = useState<MultiChoiceQuestion[]>([]);
    const [formsCount, setFormsCount] = useState(COUNTER_1);
    const [formsArray, setFormsArray] = useState<number[]>([INDEX_0]);

    const questionsChangeHandler = (
        index: number,
        question: MultiChoiceQuestion
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
                        <MultiChoiceForm
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

export default MultiChoice;

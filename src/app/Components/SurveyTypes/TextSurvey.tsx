import { Fragment, useState, useEffect } from "react";
import TextSurveyForm from "@/app/Components/Forms/TextSurveyForm";
import { Grid, Button } from "@/app/General/muiComponents";
import { TextSurveyQuestion, TextSurveyProps } from "@/app/General/interfaces";
import {
    ADD_BTN_TXT,
    ADD_BTN_VARIANT,
} from "@/app/General/Resources/SurveyTypesRes";
import {
    GRID_ITEM_12,
    GRID_CONT_SPAC_2,
    COUNTER_PLUS_1,
    COUNTER_1,
    INDEX_0,
} from "@/app/General/constants";

function TextSurvey({
    onSurveyParams = () => null,
    inputErrorsHandler = () => null,
    newErrors = [],
    isInputErrorHandler = () => null,
    emptyInputErrors = () => null,
    emptyNewErrors = () => null,
}: TextSurveyProps) {
    const [questions, setQuestions] = useState<TextSurveyQuestion[]>([]);
    const [formsCount, setFormsCount] = useState(COUNTER_1);
    const [formsArray, setFormsArray] = useState<number[]>([INDEX_0]);

    const questionsChangeHandler = (
        index: number,
        question: TextSurveyQuestion
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
                        <TextSurveyForm
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

export default TextSurvey;

import { Fragment, useState, useEffect } from "react";
import TextSurveyForm from "@/app/Components/Forms/TextSurveyForm";
import { Grid, Button } from "@/app/General/muiComponents";
import { TextSurveyQuestion, SurveyTypeProps } from "@/app/General/interfaces";
import useQuestionsChangeHandler from "@/app/hooks/use-questions-change-handler";
import {
    ADD_BTN_TXT,
    ADD_BTN_VARIANT,
} from "@/app/General/Resources/SurveyTypesRes";
import {
    GRID_ITEM_12,
    GRID_CONT_SPAC_2,
    STYPE_ARRAY_STATE_DEFAULT_0,
    STYPE_COUNTER_STATE_DEFAULT_1,
    STYPE_COUNTER_PLUS_1,
} from "@/app/General/constants";

function TextSurvey({
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
        useQuestionsChangeHandler<TextSurveyQuestion>([]);

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
                        <TextSurveyForm<TextSurveyQuestion>
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

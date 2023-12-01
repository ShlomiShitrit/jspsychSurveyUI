"use client";
import { Grid, Button } from "@/app/General/muiComponents";
import useSurveyType from "@/app/hooks/useSurveyType";
import LikertForm from "@/app/Components/Forms/LikertForm";
import { GRID_CONT_SPAC_2, GRID_ITEM_12 } from "@/app/General/constants";
import {
    ADD_BTN_VARIANT,
    ADD_BTN_TXT,
} from "@/app/General/Resources/SurveyTypesRes";
import { SurveyTypeProps, LikertQuestion } from "@/app/General/interfaces";

function Likert({
    onSurveyParams,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyTypeProps) {
    const { questionsChangeHandler, formsArray, addForm } =
        useSurveyType<LikertQuestion>(onSurveyParams);

    return (
        <>
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
        </>
    );
}

export default Likert;

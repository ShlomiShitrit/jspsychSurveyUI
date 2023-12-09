import LikertScaleForm from "@/app/Components/Forms/LikertScaleForm";
import { Grid, Button } from "@/app/General/muiComponents";
import useSurveyType from "@/app/hooks/useSurveyType";
import { LikertScaleQuestion, SurveyTypeProps } from "@/app/General/interfaces";
import {
    ADD_BTN_TXT,
    ADD_BTN_VARIANT,
} from "@/app/General/Resources/SurveyTypesRes";
import { GRID_ITEM_12 } from "@/app/General/constants";

export default function LikertScale({
    onSurveyParams,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyTypeProps) {
    const { questionsChangeHandler, formsArray, addForm } =
        useSurveyType<LikertScaleQuestion>(onSurveyParams);
    return (
        <>
            {formsArray.map((optionIndex) => (
                <Grid
                    item
                    xs={GRID_ITEM_12}
                    sm={GRID_ITEM_12}
                    md={GRID_ITEM_12}
                    key={optionIndex}
                >
                    <LikertScaleForm<LikertScaleQuestion>
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
            <Button variant={ADD_BTN_VARIANT} onClick={addForm}>
                {ADD_BTN_TXT}
            </Button>
        </>
    );
}

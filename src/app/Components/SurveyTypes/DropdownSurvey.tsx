import DropdownSurveyForm from "@/app/Components/Forms/DropdownSurveyForm";
import { Grid, Button } from "@/app/General/muiComponents";
import useSurveyType from "@/app/hooks/useSurveyType";
import {
    DropdownSurveyQuestion,
    SurveyTypeProps,
} from "@/app/General/interfaces";
import {
    ADD_BTN_TXT,
    ADD_BTN_VARIANT,
} from "@/app/General/Resources/SurveyTypesRes";
import { GRID_ITEM_12 } from "@/app/General/constants";

export default function DropdownSurvey({
    onSurveyParams,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyTypeProps) {
    const { questionsChangeHandler, formsArray, addForm } =
        useSurveyType<DropdownSurveyQuestion>(onSurveyParams);
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
                    <DropdownSurveyForm<DropdownSurveyQuestion>
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
            <br />
            <Button variant={ADD_BTN_VARIANT} onClick={addForm}>
                {ADD_BTN_TXT}
            </Button>
        </>
    );
}

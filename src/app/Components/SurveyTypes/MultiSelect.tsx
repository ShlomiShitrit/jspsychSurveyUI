import { Grid, Button } from "@/app/General/muiComponents";
import { SurveyTypeProps, MultiChoiceQuestion } from "@/app/General/interfaces";
import useSurveyType from "@/app/hooks/useSurveyType";
import MultiChoiceForm from "@/app/Components/Forms/MultiChoiceForm";
import {
    ADD_BTN_TXT,
    ADD_BTN_VARIANT,
} from "@/app/General/Resources/SurveyTypesRes";
import { GRID_ITEM_12, GRID_CONT_SPAC_2 } from "@/app/General/constants";

function MultiSelect({
    onSurveyParams,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
}: SurveyTypeProps) {
    const { questionsChangeHandler, formsArray, addForm } =
        useSurveyType<MultiChoiceQuestion>(onSurveyParams);

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
                        <MultiChoiceForm<MultiChoiceQuestion>
                            isInputErrorHandler={isInputErrorHandler}
                            id={optionIndex}
                            questionsChangeHandler={questionsChangeHandler}
                            inputErrorsHandler={inputErrorsHandler}
                            newErrors={newErrors}
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

export default MultiSelect;

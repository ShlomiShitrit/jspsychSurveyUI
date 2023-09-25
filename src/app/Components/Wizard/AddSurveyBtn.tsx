import { Button } from "@/app/General/muiComponents";
import { AddSurveyBtnProps } from "@/app/General/interfaces";
import {
    ADD_SURVEY_BTN_TEXT,
    ADD_SURVEY_BTN_VARIANT,
    ADD_SURVEY_BTN_COLOR,
} from "@/app/General/Resources/WizardMainRes";

function AddSurveyBtn({ addSurveyHandler = () => null }: AddSurveyBtnProps) {
    return (
        <Button
            variant={ADD_SURVEY_BTN_VARIANT}
            color={ADD_SURVEY_BTN_COLOR}
            onClick={addSurveyHandler}
        >
            {ADD_SURVEY_BTN_TEXT}
        </Button>
    );
}

export default AddSurveyBtn;

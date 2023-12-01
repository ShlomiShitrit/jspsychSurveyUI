"use client";
import { useState, useEffect, ChangeEvent } from "react";
import TextSurveyForm from "@/app/Components/Forms/TextSurveyForm";
import { Grid, Button, Typography } from "@/app/General/muiComponents";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
import Preamble from "@/app/Components/Forms/Preamble";
import useSurveyType from "@/app/hooks/useSurveyType";
import {
    TextSurveyQuestion,
    Step2AndTextSurveyProps,
} from "@/app/General/interfaces";
import {
    ADD_BTN_TXT,
    ADD_BTN_VARIANT,
} from "@/app/General/Resources/SurveyTypesRes";
import { GRID_ITEM_12, GRID_CONT_SPAC_2 } from "@/app/General/constants";

function TextSurvey({
    onSurveyParams,
    inputErrorsHandler,
    newErrors,
    isInputErrorHandler,
    emptyInputErrors,
    emptyNewErrors,
    textPreambleHandler,
}: Step2AndTextSurveyProps) {
    const { questionsChangeHandler, formsArray, addForm } =
        useSurveyType<TextSurveyQuestion>(onSurveyParams);

    const [preamble, setPreamble] = useState("");
    const [isImage, setIsImage] = useState(false);
    const [finalPreamble, setFinalPreamble] = useState("");

    const preambleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPreamble(value);
    };

    useEffect(() => {
        const newValue = isImage ? `<img src="${preamble}"></img>` : preamble;
        setFinalPreamble(newValue);
    }, [isImage, preamble]);

    useEffect(() => {
        textPreambleHandler(finalPreamble);
    }, [finalPreamble]);

    return (
        <>
            <br />
            <Typography variant="body1" component="h6">
                {"Choose preamble (optional):"}
            </Typography>
            <br />
            <Grid container spacing={GRID_CONT_SPAC_2}>
                <CustomTooltip
                    title={`The preamble is the text or the image
                 that will be displayed to the user before the question.
                 This field is not required`}
                />
                <Preamble
                    id={111}
                    preambleState={preamble}
                    imageState={isImage}
                    preambleHandler={preambleChangeHandler}
                    isImageHandler={(e: ChangeEvent<HTMLInputElement>) =>
                        setIsImage(e.target.checked)
                    }
                />
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
        </>
    );
}

export default TextSurvey;

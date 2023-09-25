"use client";
import { Fragment } from "react";
import { TextField, Typography } from "@/app/General/muiComponents";
import { Step3Props } from "@/app/General/interfaces";
import { step3TypStyle, step3TxtFieldStyle } from "@/app/General/styles";

import {
    TEXTFIELD_VARIANT,
    STEP3_TYP1_VAR,
    STEP3_TYP2_VAR,
    STEP3_TYP_ALIGN,
    STEP3_TYP1_TXT,
    STEP3_TYP2_TXT,
    STEP3_TXT_FIELD_LAB,
} from "@/app/General/Resources/WizardRes";

function Step3({ surveyNameHandler = () => null }: Step3Props) {
    return (
        <Fragment>
            <Typography
                sx={step3TypStyle}
                variant={STEP3_TYP1_VAR}
                align={STEP3_TYP_ALIGN}
            >
                {STEP3_TYP1_TXT}
            </Typography>
            <Typography
                sx={step3TypStyle}
                variant={STEP3_TYP2_VAR}
                align={STEP3_TYP_ALIGN}
            >
                {STEP3_TYP2_TXT}
            </Typography>
            <TextField
                sx={step3TxtFieldStyle}
                label={STEP3_TXT_FIELD_LAB}
                variant={TEXTFIELD_VARIANT}
                onChange={surveyNameHandler}
            />
        </Fragment>
    );
}

export default Step3;

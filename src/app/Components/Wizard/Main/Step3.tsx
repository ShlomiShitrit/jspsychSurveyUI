"use client";
import { ChangeEvent } from "react";
import { TextField } from "@/app/General/muiComponents";
import { Step3Props } from "@/app/General/interfaces";

import {
    TEXTFIELD_LABEL,
    TEXTFIELD_VARIANT,
} from "@/app/General/Resources/WizardMainRes";

function Step3({ fileNameHandler = () => null }: Step3Props) {
    const fileNameChanger = (e: ChangeEvent<HTMLInputElement>) => {
        fileNameHandler(e.target.value);
    };
    return (
        <TextField
            label={TEXTFIELD_LABEL}
            variant={TEXTFIELD_VARIANT}
            onChange={fileNameChanger}
        />
    );
}

export default Step3;

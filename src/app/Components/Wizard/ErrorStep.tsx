import { Typography } from "@/app/General/muiComponents";

import { ErrorStepProps } from "@/app/General/interfaces";

import {
    ERROR_STEP_VARIANT_H6,
    ERROR_STEP_VARIANT_H4,
    ERROR_STEP_ALIGN,
    ERROR_STEP_FIRST_MSG,
    ERROR_STEP_SEC_MSG,
    ERROR_STEP_EMPTY_STR,
} from "@/app/General/Resources/WizardMainRes";

function ErrorStep({ error = ERROR_STEP_EMPTY_STR }: ErrorStepProps) {
    return (
        <>
            <Typography
                variant={ERROR_STEP_VARIANT_H4}
                align={ERROR_STEP_ALIGN}
            >
                {ERROR_STEP_FIRST_MSG}
            </Typography>
            <Typography
                variant={ERROR_STEP_VARIANT_H6}
                align={ERROR_STEP_ALIGN}
            >
                {error}
                {ERROR_STEP_SEC_MSG}
            </Typography>
        </>
    );
}

export default ErrorStep;

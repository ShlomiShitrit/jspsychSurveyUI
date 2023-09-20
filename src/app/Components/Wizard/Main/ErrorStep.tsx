import { Typography } from "@/app/General/muiComponents";

import { ErrorStepProps } from "@/app/General/interfaces";

import {
    ERROR_STEP_VARIANT,
    ERROR_STEP_ALIGN,
    ERROR_STEP_FIRST_MSG,
    ERROR_STEP_SEC_MSG,
    ERROR_STEP_EMPTY_STR,
} from "@/app/General/Resources/WizardMainRes";

function ErrorStep({ error = ERROR_STEP_EMPTY_STR }: ErrorStepProps) {
    return (
        <Typography variant={ERROR_STEP_VARIANT} align={ERROR_STEP_ALIGN}>
            {ERROR_STEP_FIRST_MSG} {error}
            {ERROR_STEP_SEC_MSG}
        </Typography>
    );
}

export default ErrorStep;

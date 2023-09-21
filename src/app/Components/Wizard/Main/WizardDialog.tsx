"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Dialog,
    Button,
    DialogTitle,
    Stepper,
    DialogContent,
    Step,
    StepLabel,
    DialogActions,
    ThemeProvider,
} from "@/app/General/muiComponents";

import Step1 from "@/app/Components/Wizard/Main/Step1";
import Step2 from "@/app/Components/Wizard/Main/Step2";
import Step3 from "@/app/Components/Wizard/Main/Step3";
import { multiChoiceActions } from "@/app/store/multiChoiceSlice";
import { likertActions } from "@/app/store/likertSlice";
import DownloadBtn from "@/app/Components/Wizard/Main/DownloadBtn";
import ErrorStep from "@/app/Components/Wizard/Main/ErrorStep";
import { RootState } from "@/app/store/index";
import { darkTheme, wizradDialogDialogStyle } from "@/app/General/styles";
import { mcParamsObj, likertParamsObj } from "@/app/General/Objects";
import {
    MultiChoiceQuestion,
    LikertQuestion,
    CreateWizardProps,
} from "@/app/General/interfaces";
import {
    WIZRAD_DIALOG_STEP_0,
    WIZRAD_DIALOG_STEP_1,
    WIZRAD_DIALOG_STEP_2,
} from "@/app/General/constants";
import {
    STEPS,
    MULTI_CHOICE_STYPE,
    LIKERT_STYPE,
    ERROR_STEP_MESSAGE,
    DIALOG_TITLE,
    CLOSE_BTN_TEXT,
    BACK_BTN_TEXT,
    NEXT_BTN_TEXT,
    TEST_BTN_TEXT,
    NEXT_BTN_VARIANT,
    EMPTY_STRING,
} from "@/app/General/Resources/WizardMainRes";

function WizardDialog({
    open = false,
    closeWizard = () => null,
}: CreateWizardProps) {
    const [activeStep, setActiveStep] = useState(WIZRAD_DIALOG_STEP_0);
    const [multiChoiceParams, setMultiChoiceParams] =
        useState<MultiChoiceQuestion>(mcParamsObj);
    const [likertParams, setLikertParams] =
        useState<LikertQuestion>(likertParamsObj);
    const [fileName, setFileName] = useState(EMPTY_STRING);
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );
    const dispatch = useDispatch();
    const addMultiChoiceQuestion = (question: MultiChoiceQuestion) => {
        dispatch(multiChoiceActions.addQuestion(question));
    };
    const addLikertQuestion = (question: LikertQuestion) => {
        dispatch(likertActions.addQuestion(question));
    };

    const handleBack = () => {
        setActiveStep(activeStep - WIZRAD_DIALOG_STEP_1);
    };

    const multiChiceParamsHandler = (params: MultiChoiceQuestion) => {
        setMultiChoiceParams(params);
    };

    const likertParamsHandler = (params: LikertQuestion) => {
        setLikertParams(params);
    };

    const fileNameHandler = (name: string) => {
        setFileName(name);
    };

    const closeForm = () => {
        setActiveStep(WIZRAD_DIALOG_STEP_0);
        closeWizard();
    };

    function GetStepContent(step: number) {
        switch (step) {
            case WIZRAD_DIALOG_STEP_0:
                return <Step1 />;
            case WIZRAD_DIALOG_STEP_1:
                return (
                    <Step2
                        onMCParams={multiChiceParamsHandler}
                        onLikertParams={likertParamsHandler}
                    />
                );
            case WIZRAD_DIALOG_STEP_2:
                return <Step3 fileNameHandler={fileNameHandler} />;
            default:
                return <ErrorStep error={ERROR_STEP_MESSAGE} />;
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + WIZRAD_DIALOG_STEP_1);
        if (surveyType === MULTI_CHOICE_STYPE) {
            addMultiChoiceQuestion(multiChoiceParams as MultiChoiceQuestion);
        } else if (surveyType === LIKERT_STYPE) {
            addLikertQuestion(likertParams as LikertQuestion);
        }
    };

    const test = () => {
        console.log(surveyType);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Dialog
                open={open}
                onClose={closeForm}
                sx={wizradDialogDialogStyle}
                fullWidth
            >
                <DialogTitle>{DIALOG_TITLE}</DialogTitle>
                <DialogContent>
                    <Stepper activeStep={activeStep}>
                        {STEPS.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {GetStepContent(activeStep)}
                </DialogContent>
                {activeStep <= WIZRAD_DIALOG_STEP_2 && (
                    <DialogActions>
                        <Button onClick={closeWizard}>{CLOSE_BTN_TEXT}</Button>
                        <Button onClick={test}>{TEST_BTN_TEXT}</Button>
                        <Button
                            onClick={handleBack}
                            disabled={activeStep === WIZRAD_DIALOG_STEP_0}
                        >
                            {BACK_BTN_TEXT}
                        </Button>
                        <Button
                            variant={NEXT_BTN_VARIANT}
                            onClick={handleNext}
                            disabled={activeStep === WIZRAD_DIALOG_STEP_2}
                        >
                            {NEXT_BTN_TEXT}
                        </Button>
                        {activeStep === WIZRAD_DIALOG_STEP_2 && (
                            <DownloadBtn fileName={fileName} />
                        )}
                    </DialogActions>
                )}
            </Dialog>
        </ThemeProvider>
    );
}

export default WizardDialog;

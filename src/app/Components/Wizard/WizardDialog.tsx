"use client";
import { useState, ChangeEvent } from "react";
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

import Step1 from "@/app/Components/Wizard/Step1";
import Step2 from "@/app/Components/Wizard/Step2";
import Step3 from "@/app/Components/Wizard/Step3";
import { multiChoiceActions } from "@/app/store/multiChoiceSlice";
import { multiSelectActions } from "@/app/store/multiSelectSlice";
import { likertActions } from "@/app/store/likertSlice";
import { surveyListActions } from "@/app/store/surveyListSlice";
import { textActions } from "@/app/store/textSlice";
import AddSurveyBtn from "@/app/Components/Wizard/AddSurveyBtn";
import ErrorStep from "@/app/Components/Wizard/ErrorStep";
import { RootState } from "@/app/store/index";
import { darkTheme, wizradDialogDialogStyle } from "@/app/General/styles";
import {
    mcParamsObj,
    likertParamsObj,
    textParamsObj,
} from "@/app/General/Objects";
import {
    MultiChoiceQuestion,
    LikertQuestion,
    CreateWizardProps,
    TextSurveyQuestion,
} from "@/app/General/interfaces";
import {
    WIZRAD_DIALOG_STEP_0,
    WIZRAD_DIALOG_STEP_1,
    WIZRAD_DIALOG_STEP_2,
    INDEX_MINUS_1,
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
    STYPE_MULTI_CHOICE,
    STYPE_LIKERT,
    ERR_MSG_STYPE,
    STYPE_MS,
    STYPE_TEXT,
} from "@/app/General/Resources/WizardRes";

function WizardDialog({
    open = false,
    closeWizard = () => null,
}: CreateWizardProps) {
    const [activeStep, setActiveStep] = useState(WIZRAD_DIALOG_STEP_0);
    const [multiChoiceParams, setMultiChoiceParams] = useState<
        MultiChoiceQuestion[]
    >([mcParamsObj]);
    const [likertParams, setLikertParams] = useState<LikertQuestion[]>([
        likertParamsObj,
    ]);
    const [multiSelectParams, setMultiSelectParams] = useState<
        MultiChoiceQuestion[]
    >([mcParamsObj]);
    const [textParams, setTextParams] = useState<TextSurveyQuestion[]>([
        textParamsObj,
    ]);
    const [surveyName, setSurveyName] = useState(EMPTY_STRING);
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(EMPTY_STRING);
    const [isInputError, setIsInputError] = useState(false);
    const [inputErrors, setInputErrors] = useState<{ [key: string]: string }[]>(
        []
    );

    const [newErrors, setNewErrors] = useState<{ [key: string]: string }[]>([]);

    const dispatch = useDispatch();
    const addMultiChoiceQuestion = (question: MultiChoiceQuestion) => {
        dispatch(multiChoiceActions.addQuestion(question));
    };
    const addLikertQuestion = (question: LikertQuestion) => {
        dispatch(likertActions.addQuestion(question));
    };

    const addMultiSelectQuestion = (question: MultiChoiceQuestion) => {
        dispatch(multiSelectActions.addQuestion(question));
    };

    const handleBack = () => {
        setActiveStep(activeStep - WIZRAD_DIALOG_STEP_1);
    };

    const multiChiceParamsHandler = (params: MultiChoiceQuestion[]) => {
        setMultiChoiceParams(params);
    };
    const multiSelectParamsHandler = (params: MultiChoiceQuestion[]) => {
        setMultiSelectParams(params);
    };

    const likertParamsHandler = (params: LikertQuestion[]) => {
        setLikertParams(params);
    };

    const textParamsHandler = (params: TextSurveyQuestion[]) => {
        setTextParams(params);
    };

    const surveyNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSurveyName(e.target.value);
    };

    const closeForm = () => {
        setActiveStep(WIZRAD_DIALOG_STEP_0);
        closeWizard();
    };

    const errorHandler = (msg: string) => {
        setIsError(true);
        setErrorMsg(msg);
    };

    const inputErrorsHandler = (key: string, value: string) => {
        setInputErrors((prevInputErrors) => {
            const existingIndex = prevInputErrors.findIndex(
                (error) => error[key] === value
            );

            if (existingIndex !== INDEX_MINUS_1) {
                const updatedErrors = [...prevInputErrors];
                updatedErrors[existingIndex] = {
                    ...updatedErrors[existingIndex],
                    [key]: value,
                };
                return updatedErrors;
            } else {
                const newObject = { [key]: value };

                return [...prevInputErrors, newObject];
            }
        });
    };

    const isInputErrorHanlder = (value: boolean) => {
        setIsInputError(value);
    };

    const setInputErrorsToEmpty = () => {
        setInputErrors([]);
    };

    const setNewErrorsToEmpty = () => {
        setNewErrors([]);
    };

    function GetStepContent(step: number) {
        if (isError) {
            return <ErrorStep error={errorMsg} />;
        }
        switch (step) {
            case WIZRAD_DIALOG_STEP_0:
                return <Step1 />;
            case WIZRAD_DIALOG_STEP_1:
                return (
                    <Step2
                        onMCParams={multiChiceParamsHandler}
                        onLikertParams={likertParamsHandler}
                        onMSParams={multiSelectParamsHandler}
                        onTextParams={textParamsHandler}
                        inputErrorsHandler={inputErrorsHandler}
                        newErrors={newErrors}
                        isInputErrorHandler={isInputErrorHanlder}
                        emptyInputErrors={setInputErrorsToEmpty}
                        emptyNewErrors={setNewErrorsToEmpty}
                    />
                );
            case WIZRAD_DIALOG_STEP_2:
                return <Step3 surveyNameHandler={surveyNameHandler} />;
            default:
                return <ErrorStep error={ERROR_STEP_MESSAGE} />;
        }
    }

    const handleNext = () => {
        if (activeStep === WIZRAD_DIALOG_STEP_1) {
            switch (surveyType) {
                case MULTI_CHOICE_STYPE:
                    multiChoiceParams.forEach((question) => {
                        addMultiChoiceQuestion(question);
                    });
                    break;
                case LIKERT_STYPE:
                    likertParams.forEach((question) => {
                        addLikertQuestion(question);
                    });
                    break;
                case STYPE_MS:
                    multiSelectParams.forEach((question) => {
                        addMultiSelectQuestion(question);
                    });
                    break;
                case STYPE_TEXT:
                    textParams.forEach((question) => {
                        dispatch(textActions.addQuestion(question));
                    });
                    break;
                default:
                    errorHandler(ERR_MSG_STYPE);
                    break;
            }
        }
        if (isInputError && activeStep === WIZRAD_DIALOG_STEP_1) {
            setNewErrors(inputErrors);
        } else {
            setActiveStep(activeStep + WIZRAD_DIALOG_STEP_1);
        }
    };

    const index = useSelector((state: RootState) => state.surveyList.length);

    const addSurveyHandler = () => {
        let questions:
            | LikertQuestion[]
            | MultiChoiceQuestion[]
            | TextSurveyQuestion[] = [];
        if (surveyType === STYPE_MULTI_CHOICE) {
            questions = multiChoiceParams;
        } else if (surveyType === STYPE_LIKERT) {
            questions = likertParams;
        } else if (surveyType === STYPE_MS) {
            questions = multiSelectParams;
        } else if (surveyType === STYPE_TEXT) {
            questions = textParams;
        }
        dispatch(
            surveyListActions.addSurvey({
                index: index,
                name: surveyName,
                stype: surveyType,
                questions: questions,
            })
        );
        closeForm();
    };

    const test = () => console.log(inputErrors);
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
                            <AddSurveyBtn addSurveyHandler={addSurveyHandler} />
                        )}
                    </DialogActions>
                )}
            </Dialog>
        </ThemeProvider>
    );
}

export default WizardDialog;

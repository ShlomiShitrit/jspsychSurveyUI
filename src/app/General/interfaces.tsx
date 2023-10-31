"use client";
import { ChangeEvent } from "react";

export interface WelcomeMessageProps {
    clickHandler: () => void;
    text1: string;
    text2: string;
    btnText: string;
}

export interface DownloadBtnProps {
    fileName: string;
    errorHandler: (error: string) => void;
}

export interface ErrorStepProps {
    error: string;
}

interface Questions {
    index: number;
    promptQ: string | string[];
    nameQ: string | string[];
}

export interface MultiChoiceQuestion extends Questions {
    optionsQ: string[];
    required: boolean;
    horizontal: boolean;
}

export interface LikertQuestion extends Questions {
    optionsQ: string[];
    randomQ: boolean;
}
export interface TextSurveyQuestion extends Questions {
    placeHolder: string;
    required: boolean;
    preamble: string;
}

export interface TextSurveyState {
    preamble: string;
    textQuestions: TextSurveyQuestion[];
}

export interface Step3Props {
    surveyNameHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CreateWizardProps {
    open: boolean;
    closeWizard: () => void;
}

export interface AddOptionBtnProps {
    optionHandler: () => void;
    isAdd: boolean;
}

interface FormProps {
    newErrors: { [key: string]: string }[];
    errorId: string;
    labelText: string;
}

export interface InputTextFieldProps extends FormProps {
    state: string;
    stateHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    inputType: string;
    id: number;
}
export interface SwitchLabelProps {
    isState: boolean;
    stateHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    labelText: string;
}

interface GridProps {
    optionsQ: string[];
    optionsQChangeHandler: (
        index: number
    ) => (e: ChangeEvent<HTMLInputElement>) => void;
    optionsArray: number[];
}
export interface OptionsGridProps extends FormProps, GridProps {}

export interface PromptsGridProps extends GridProps {
    namesQ: string[];
    nameQChangeHandler: (
        index: number
    ) => (e: ChangeEvent<HTMLInputElement>) => void;
    nameArray: number[];
    errorId: {
        prompt: string;
        name: string;
    };
    newErrors: { [key: string]: string }[];
}

interface SurveyProps {
    newErrors: { [key: string]: string }[];
    emptyInputErrors: () => void;
    emptyNewErrors: () => void;
    inputErrorsHandler: (key: string, value: string) => void;
    isInputErrorHandler: (value: boolean) => void;
}

export type QuestionType =
    | LikertQuestion
    | MultiChoiceQuestion
    | TextSurveyQuestion;

export type QuestionTypeArr =
    | LikertQuestion[]
    | MultiChoiceQuestion[]
    | TextSurveyQuestion[];

export interface SurveyFormProps<T extends QuestionType> extends SurveyProps {
    questionsChangeHandler: (index: number, question: T) => void;
    id: number;
}

export interface SurveyTypeProps extends SurveyProps {
    onSurveyParams: (params: QuestionTypeArr) => void;
}

export interface Step2AndTextSurveyProps extends SurveyTypeProps {
    textPreambleHandler: (value: string) => void;
}

export interface AddSurveyBtnProps {
    addSurveyHandler: () => void;
}

export interface ListItemObj {
    index: number;
    stype: string;
    name: string;
    questions: LikertQuestion[] | MultiChoiceQuestion[] | TextSurveyState;
}
export interface DownloadDialogProps {
    open: boolean;
    closeDialogHandler: () => void;
}

export interface NewError {
    [key: string]: string;
}

export interface PreambleProps {
    id: number;
    preambleState: string;
    imageState: boolean;
    preambleHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    isImageHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

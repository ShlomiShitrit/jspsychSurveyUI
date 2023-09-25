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

export interface MultiChoiceQuestion {
    index: number;
    promptQ: string;
    nameQ: string;
    optionsQ: string[];
    required: boolean;
    horizontal: boolean;
}

export interface LikertQuestion {
    index: number;
    promptQ: string[];
    nameQ: string[];
    optionsQ: string[];
    randomQ: boolean;
}
export interface TextSurveyQuestion {
    index: number;
    promptQ: string;
    nameQ: string;
    placeHolder: string;
    required: boolean;
}

export interface Step2Props {
    onMCParams: (params: MultiChoiceQuestion[]) => void;
    onLikertParams: (params: LikertQuestion[]) => void;
    onMSParams: (params: MultiChoiceQuestion[]) => void;
    onTextParams: (params: TextSurveyQuestion[]) => void;
}

export interface Step3Props {
    surveyNameHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CreateWizardProps {
    open: boolean;
    closeWizard: () => void;
}

export interface AddOptionBtnProps {
    addOption: () => void;
}

export interface InputTextFieldProps {
    state?: string;
    stateHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    inputType?: string;
    id?: number;
    labelText?: string;
    isState?: boolean;
}

export interface OptionsGridProps {
    optionsQ: string[];
    optionsQChangeHandler: (
        index: number
    ) => (e: ChangeEvent<HTMLInputElement>) => void;
    optionsArray: number[];
    labelText: string;
}

export interface PromptsGridProps {
    promptsQ: string[];
    promptsQChangeHandler: (
        index: number
    ) => (e: ChangeEvent<HTMLInputElement>) => void;
    promptsArray: number[];
    namesQ: string[];
    nameQChangeHandler: (
        index: number
    ) => (e: ChangeEvent<HTMLInputElement>) => void;
    nameArray: number[];
}

export interface LikertProps {
    onSurveyParams: (params: LikertQuestion[]) => void;
}

export interface LikertFormProps {
    questionsChangeHandler: (index: number, question: LikertQuestion) => void;
    id: number;
}

export interface MultiChoiceProps {
    onSurveyParams: (params: MultiChoiceQuestion[]) => void;
}
export interface TextSurveyProps {
    onSurveyParams: (params: TextSurveyQuestion[]) => void;
}

export interface MultiChoiceFormProps {
    questionsChangeHandler: (
        index: number,
        question: MultiChoiceQuestion
    ) => void;
    id: number;
}
export interface TextSurveyFormProps {
    questionsChangeHandler: (
        index: number,
        question: TextSurveyQuestion
    ) => void;
    id: number;
}

export interface AddSurveyBtnProps {
    addSurveyHandler: () => void;
}

export interface ListItemObj {
    index: number;
    stype: string;
    name: string;
    questions: MultiChoiceQuestion[] | LikertQuestion[] | TextSurveyQuestion[];
}
export interface DownloadDialogProps {
    open: boolean;
    closeDialogHandler: () => void;
}

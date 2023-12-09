"use client";
import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    ChangeEvent,
} from "react";
import { QuestionType } from "../General/interfaces";
import { RootState } from "@/app/store/index";
import { useSelector } from "react-redux";
import {
    FORM_NUM_ARR_STATE_DEFAULT,
    FORM_COUNTER_STATE_DEFAULT_2,
    FORM_COUNTER_PLUS_1,
    FORM_COUNTER_STATE_DEFAULT_1,
} from "@/app/General/constants";

export default function useSurveyForm<T extends QuestionType>(
    id: number,
    questionsChangeHandler: Function
) {
    const [options, setOptions] = useState<string[]>([]);
    const [optionsCount, setOptionsCount] = useState<number>(
        FORM_COUNTER_STATE_DEFAULT_2
    );
    const [optionsArray, setOptionsArray] = useState<number[]>(
        FORM_NUM_ARR_STATE_DEFAULT
    );
    const [prompts, setPrompts] = useState<string[]>([]);
    const [promptsCount, setPromptsCount] = useState<number>(1);
    const [promptsArray, setPromptsArray] = useState<number[]>([0]);
    const [names, setNames] = useState<string[]>([]);
    const [nameCount, setNameCount] = useState<number>(1);
    const [nameArray, setNameArray] = useState<number[]>([0]);
    const [random, setRandom] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [required, setRequired] = useState<boolean>(true);
    const [horizontal, setHorizontal] = useState<boolean>(false);
    const [placeHolder, setPlaceHolder] = useState("");

    const [html, setHtml] = useState<string>("");
    const [preamble, setPreamble] = useState<string>("");
    const [buttonLabel, setButtonLabel] = useState<string>("");

    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );

    const updateArray = <S,>(
        state: S[],
        setState: Dispatch<SetStateAction<S[]>>
    ) => {
        const updatedState = [...state];
        updatedState.pop();
        setState(updatedState);
    };

    const removeInput = (option: boolean = true) => {
        if (option) {
            if (optionsCount === FORM_COUNTER_STATE_DEFAULT_2) return;
            updateArray<string>(options, setOptions);
            updateArray<number>(optionsArray, setOptionsArray);
            setOptionsCount(optionsCount - FORM_COUNTER_PLUS_1);
        } else {
            if (promptsCount === FORM_COUNTER_STATE_DEFAULT_1) return;
            updateArray<string>(prompts, setPrompts);
            updateArray<number>(promptsArray, setPromptsArray);
            setPromptsCount(promptsCount - FORM_COUNTER_PLUS_1);
            updateArray<string>(names, setNames);
            updateArray<number>(nameArray, setNameArray);
            setNameCount(nameCount - FORM_COUNTER_PLUS_1);
        }
    };

    const stateHandler =
        (
            state: string[],
            setState: (value: React.SetStateAction<string[]>) => void
        ) =>
        (index: number) =>
        (e: ChangeEvent<HTMLInputElement>) => {
            const updatedArray = [...state];
            updatedArray[index] = `'${e.target.value}'`;
            setState(updatedArray);
        };

    const addInput = (option: boolean = true) => {
        if (option) {
            setOptionsCount(optionsCount + FORM_COUNTER_PLUS_1);
            setOptionsArray([...optionsArray, optionsCount]);
        } else {
            setPromptsCount(promptsCount + FORM_COUNTER_PLUS_1);
            setPromptsArray([...promptsArray, promptsCount]);
            setNameCount(nameCount + FORM_COUNTER_PLUS_1);
            setNameArray([...nameArray, nameCount]);
        }
    };

    let QuestionData: T = {} as T;
    switch (surveyType) {
        case "Likert":
            QuestionData = {
                index: id,
                promptQ: prompts,
                nameQ: names,
                optionsQ: options,
                randomQ: random,
            } as T;
            break;
        case "Multi Select":
            QuestionData = {
                index: id,
                promptQ: prompt,
                nameQ: name,
                optionsQ: options,
                required: required,
                horizontal: horizontal,
            } as T;
            break;
        case "Multi Choice":
            QuestionData = {
                index: id,
                promptQ: prompt,
                nameQ: name,
                optionsQ: options,
                required: required,
                horizontal: horizontal,
            } as T;
            break;
        case "Text":
            QuestionData = {
                index: id,
                promptQ: prompt,
                nameQ: name,
                optionsQ: options,
                randomQ: random,
            } as T;
            break;
        case "html":
            QuestionData = {
                index: id,
                html: html,
                preamble: preamble,
                buttonLabel: buttonLabel,
            } as T;
            break;
    }

    useEffect(() => {
        questionsChangeHandler(id, QuestionData as T);
    }, [QuestionData]);

    const multiChoiceValues = {
        name,
        optionsArray,
        required,
        horizontal,
        prompt,
        options,
        surveyType,
        addInput,
        removeInput,
        stateHandler,
        setPrompt,
        setOptions,
        setName,
        setRequired,
        setHorizontal,
    };

    const likertValues = {
        prompts,
        names,
        options,
        surveyType,
        optionsArray,
        promptsArray,
        nameArray,
        random,
        addInput,
        removeInput,
        stateHandler,
        setPrompts,
        setRandom,
        setOptions,
        setNames,
    };

    const textValues = {
        prompt,
        placeHolder,
        name,
        surveyType,
        required,
        setPrompt,
        setName,
        setPlaceHolder,
        setRequired,
    };

    const htmlValues = {
        html,
        preamble,
        buttonLabel,
        surveyType,
        setHtml,
        setPreamble,
        setButtonLabel,
    };

    return { multiChoiceValues, likertValues, textValues, htmlValues };
}

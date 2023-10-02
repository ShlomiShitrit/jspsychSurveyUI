import { useState } from "react";
import { QuestionType } from "@/app/General/interfaces";

function useQuestionsChangeHandler<T extends QuestionType>(
    initialQuestions: T[] = []
) {
    const [questions, setQuestions] = useState<T[]>(initialQuestions);

    const questionsChangeHandler = (index: number, question: T) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = question;
        setQuestions(updatedQuestions);
    };

    return { questions, questionsChangeHandler };
}

export default useQuestionsChangeHandler;

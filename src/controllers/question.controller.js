import { createQuestionWithAnswerService } from "../services/questions.service.js";

export const createQuestionWithAnswerController = async (req, res) => {
    try {
        const {
            quizId,
            questionType,
            questionContent,
            image,
            timeLimit,
            points,
            doublePoints,
            answers
        } = req.body;

        if (!quizId || !questionContent || !Array.isArray(answers) || answers.length < 1) {
            return res.status(400).json({ message: "Missing data or answers" });
        }
        const allowedTypes = ["multiple_choice", "single_choice", "text_input"];
        if (!allowedTypes.includes(questionType)) {
            return res.status(400).json({ message: "Invalid question type" });
        }
        const dataQuestion = {
            quizId,
            questionType,
            questionContent,
            image,
            timeLimit: timeLimit || 10,
            points: points || 0,
            doublePoints,
            answers
        };
        const result = await createQuestionWithAnswerService(dataQuestion);
        res.status(201).json({ message: "Question created", data: result });

    } catch (error) {
        console.error("❌ Create Question Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
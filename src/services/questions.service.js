import { connection } from "../config/db.js";
import { addAnswersModel } from "../models/answers.module.js";
import { createQuestionModel } from "../models/questions.model.js"

export const createQuestionWithAnswerService = async ({ quizId, questionType, questionContent, image, timeLimit, points, doublePoints, answers }) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();
        const question = await createQuestionModel(
            { quizId, questionType, questionContent, image, timeLimit, points, doublePoints },
            conn
        );

        await addAnswersModel(question.insertId, answers, conn);
        await conn.commit();
        return { message: "Question and answers created successfully" };
    }

    catch (error) {
        await conn.rollback();
        console.error(error);
        throw new Error("Transaction failed: " + error.message);
    }

    finally {
        conn.release();
    }

}
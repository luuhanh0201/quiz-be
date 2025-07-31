import { dbMutate } from "../utils/transformKey.js"

export const addAnswersModel = async (questionId, answers) => {

    const query = "INSERT INTO answer_questions (question_id, content_answer, is_correct) VALUES ?"

    const values = answers.map(answer => [questionId,
        answer.contentAnswer,
        answer.isCorrect ? 1 : 0])

    const result = await dbMutate(query, [values])
    return result
}
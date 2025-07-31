import { dbMutate } from "../utils/transformKey.js"

export const createQuestionModel = async ({ quizId, questionType, questionContent, image, timeLimit, points, doublePoints }) => {
    const query = "INSERT INTO questions (quiz_id,question_type,question_content,image,time_limit,points,double_points) VALUES (?, ?, ?, ?, ?, ?, ?)"
    const result = await dbMutate(query, [quizId, questionType, questionContent, image, timeLimit, points, doublePoints])
    return result
}
import { connection } from "../config/db";

export const createQuizz = async ({ questionId, userId, title, description, tag, isPublic = true }) => {
    const query = "INSERT INTO quizzes (question_id,user_id,title,description,tag,is_public) VALUES (?,?,?,?,?,?)";
    const [result] = await connection.query(query, [questionId, userId, title, description, tag, isPublic]);
    return result;
};

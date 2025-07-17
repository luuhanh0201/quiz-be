import { dbQuery } from "../utils/transformKey.js";
export const createQuizModel = async ({ userId, title, description, tag, isPublic = true, coverImage }) => {
    const query = "INSERT INTO quizzes (user_id,title,description,tag,is_public,cover_image) VALUES (?,?,?,?,?,?)";
    const result = await dbQuery(query, [userId, title, description, tag, isPublic, coverImage]);
    return result;
};

export const getQuizzesByIdUserModel = async (userId) => {
    const query = 'SELECT * FROM quizzes WHERE user_id = ?';
    const result = await dbQuery(query, [userId]);
    return result;
};
export const deleteQuizByIdModel = async (quizId, userId) => {
    const query = 'DELETE FROM quizzes WHERE id = ? AND user_id = ?';
    const result = await dbQuery(query, [quizId, userId]);
    return result;
};
export const updateQuizModel = async (quizId, userId, { title, description, tag, isPublic, coverImage }) => {
    const query = `UPDATE quizzes SET title = ?, description = ?, tag = ?, is_public = ?, cover_image = ? WHERE id = ? AND user_id = ?`;
    const result = await dbQuery(query, [title, description, tag, isPublic, coverImage, quizId, userId]);
    return result;
};
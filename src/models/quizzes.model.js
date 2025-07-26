import { dbQuery } from "../utils/transformKey.js";
export const createQuizModel = async ({ userId, title, description, tag, isPublic = true, coverImage }) => {
    const query = "INSERT INTO quizzes (user_id,title,description,tag,is_public,cover_image) VALUES (?,?,?,?,?,?)";
    const result = await dbQuery(query, [userId, title, description, tag, isPublic, coverImage]);
    return result;
};

export const getDetailQuizModel = async (idQuiz) => {
    const query = `SELECT quizzes.*, users.username FROM quizzes JOIN users ON quizzes.user_id = users.user_id WHERE quizzes.id = ?
`;
    const [row] = await dbQuery(query, [idQuiz])
    return row
}

export const getQuizzesByIdUserModel = async (userId) => {
    const query = 'SELECT * FROM quizzes WHERE user_id = ?';
    const result = await dbQuery(query, [userId]);
    return result;
};
export const getAllQuizzesModel = async () => {
    const query = `
    SELECT quizzes.*, users.username
    FROM quizzes
    JOIN users ON quizzes.user_id = users.user_id WHERE quizzes.is_public = 1;
  `;
    const rows = await dbQuery(query);
    return rows;
};
export const getTopLikedQuizzesModel = async () => {
    const query = `SELECT *,users.username FROM quizzes JOIN users ON quizzes.user_id = users.user_id WHERE quizzes.is_public = 1 ORDER BY quizzes.likes DESC LIMIT 8`;
    return await dbQuery(query);
};

export const getTopNewestQuizzesModel = async () => {
    const query = `SELECT *,users.username FROM quizzes JOIN users ON quizzes.user_id = users.user_id WHERE quizzes.is_public = 1 ORDER BY quizzes.created_at DESC LIMIT 8`;

    return await dbQuery(query);
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
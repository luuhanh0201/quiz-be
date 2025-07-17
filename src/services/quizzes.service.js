import { createQuizModel, deleteQuizByIdModel, getQuizzesByIdUserModel, updateQuizModel } from "../models/quizzes.model.js";


export const createQuizService = async ({ userId, title, description, tag, isPublic, coverImage }) => {
    return await createQuizModel({ userId, title, description, tag, isPublic, coverImage });
};

export const getQuizzesByIdUserService = async (userId) => {
    const quizzes = await getQuizzesByIdUserModel(userId)
    return quizzes
}
export const deleteQuizByIdService = async (quizzesId, userId) => {
    const quizzes = await deleteQuizByIdModel(quizzesId, userId)
    return quizzes
}

export const updateQuizService = async (quizId, userId, { title, description, tag, isPublic, coverImage }) => {
    const quizzes = await updateQuizModel(quizId, userId, { title, description, tag, isPublic, coverImage });
    return quizzes
};
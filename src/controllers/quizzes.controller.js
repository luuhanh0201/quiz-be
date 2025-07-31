
import { createQuizService, deleteQuizByIdService, getDetailQuizService, getQuizzesByIdUserService, getQuizzesService, updateQuizService } from "../services/quizzes.service.js";

export const getQuizzesByUserIdController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const quizzes = await getQuizzesByIdUserService(userId);
        return res.status(200).json({
            message: "Get quizzes successful",
            data: quizzes,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const getAllQuizzesController = async (req, res) => {
    try {
        const quizzes = await getQuizzesService();
        return res.status(200).json({
            message: "Get quizzes successfully",
            quizzes,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Get all error:" + error,
        });
    }
};
export const createQuizController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { title, description, tags } = req.body;
        const coverImage = req.file ? `/uploads/${req.file.filename}` : null
        const isPublic = req.body.isPublic === "true" || req.body.isPublic === true ? 1 : 0;
        const result = await createQuizService({
            userId,
            title,
            description,
            tags,
            isPublic,
            coverImage
        });
        return res.status(201).json({ message: "Quiz created", quizId: result.insertId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const getDetailQuizController = async (req, res) => {
    try {
        const quizId = req.params.id
        const quiz = await getDetailQuizService(quizId)
        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            })
        }
        return res.status(200).json({
            data: quiz
        })

    } catch (error) {
        return res.status(400).json({
            mess: error.message
        })
    }
}


export const deleteQuizController = async (req, res) => {
    const quizId = req.params.id;
    const userId = req.user.user_id;
    const quizzes = await getQuizzesByIdUserService(userId)
    try {
        const quiz = await quizzes.find(q => q.id === Number(quizId));
        if (quiz) {
            await deleteQuizByIdService(quizId, userId);
            return res.json({ message: 'Deleted successfully', });
        } else {
            return res.json({ message: 'Quizzes not found or has already been deleted', });
        }
    } catch (err) {
        res.status(500).json({ message: 'Delete failed', error: err.message });
    }
};

export const updateQuizController = async (req, res) => {
    const quizId = req.params.id;
    const userId = req.user.user_id;
    let { title, description, tag, isPublic, coverImage } = req.body;
    try {
        const quizzes = await getQuizzesByIdUserService(userId);
        const quizExists = quizzes.find((quiz) => quiz.id === Number(quizId));
        if (!coverImage || coverImage.trim() === "") {
            coverImage = quizExists.coverImage
        }
        if (!quizExists) {
            return res.status(404).json({ message: "Quiz not found or has been deleted" });
        }

        await updateQuizService(quizId, userId, {
            title,
            description,
            tag,
            isPublic,
            coverImage,
        });

        return res.json({ message: "Quiz updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Update failed", error: err.message });
    }
};
import { createQuizService, deleteQuizByIdService, getQuizzesByIdUserService, updateQuizService } from "../services/quizzes.service.js";


export const createQuizController = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { title, description, tag, isPublic, coverImage } = req.body;

        const result = await createQuizService({
            userId,
            title,
            description,
            tag,
            isPublic,
            coverImage
        });
        return res.status(201).json({ message: "Quiz created", quizId: result.insertId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

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
        console.log(quizzes)
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
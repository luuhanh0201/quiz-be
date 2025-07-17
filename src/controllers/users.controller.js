import { getAllUsers, getOneUser as getUserById, updateUser as updateUserById } from "../models/users.model.js";

export const getAll = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const getOneUser = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const profileUser = await getUserById(userId);
        delete profileUser.password;
        delete profileUser.role;

        return res.json(profileUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const profileUser = await getUserById(userId);
        const avatar = req.file
            ? `/uploads/${req.file.filename}`
            : profileUser.avatar;
        const username = req.body.username;

        await updateUserById({ idUser: userId, username, avatar });
        const newProfile = await getUserById(userId);
        delete newProfile.password;
        return res.status(200).json({ message: "Update successfully", newProfile });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

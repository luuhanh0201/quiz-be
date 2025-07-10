import { getAllUsers } from "../models/users.model.js";

export const getAll = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

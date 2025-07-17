import { dbQuery } from "../utils/transformKey.js";

export const getAllUsers = async () => {
    const result = await dbQuery("SELECT * FROM users");
    return result;
};

export const getOneUser = async (idUser) => {
    const query = `SELECT * FROM users WHERE user_id = ?`;
    const result = await dbQuery(query, [idUser]);
    return result[0];
};
export const updateUser = async ({ idUser, username, avatar }) => {
    const query = `UPDATE users SET username = ?, avatar = ? WHERE user_id = ?`;

    const result = await dbQuery(query, [username,avatar, idUser]);
    return result;
};

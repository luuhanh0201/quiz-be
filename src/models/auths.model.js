import { connection } from "../config/db.js";
import bcryptjs from "bcryptjs";
export const signUpAccount = async (username, email, password, avatar) => {
    const hashPassword = await bcryptjs.hash(password, 10);
    const query = "INSERT INTO users (username,email,password,avatar) VALUES (?,?,?,?)";
    const [result] = await connection.query(query, [username, email, hashPassword, avatar]);
    return result;
};

export const checkExistUser = async (username, email) => {
    const query = "SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1";
    const [result] = await connection.query(query, [username, email]);
    return result.length > 0 ? result[0] : result;
};
export const getUserByUsername = async (username) => {
    const query = "SELECT * FROM users WHERE username = ? LIMIT 1";
    const [result] = await connection.query(query, [username]);
    return result[0] || null;
};

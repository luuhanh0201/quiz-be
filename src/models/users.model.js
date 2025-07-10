import { connection } from "../config/db.js";

export const getAllUsers = async () => {
    const [result] = await connection.query("SELECT * FROM users");
    return result;
};

export const getOneUser = async (id_user)=>{

}
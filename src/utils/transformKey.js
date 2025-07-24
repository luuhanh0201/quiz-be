import camelcaseKeys from "camelcase-keys";
import { connection } from "../config/db.js";

export const dbQuery = async (sql, params = []) => {
    const [rows] = await connection.query(sql, params);
    if (Array.isArray(rows)) {
        const result = rows.map((row) => camelcaseKeys(row))
        return result;
    } else {
        return camelcaseKeys(rows);
    }
};


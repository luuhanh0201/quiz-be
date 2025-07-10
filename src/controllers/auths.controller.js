import { signUpValid } from "../validations/user.validation.js";
import { checkExistUser, getUserByUsername, signUpAccount } from "../models/auths.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
    try {
        const { username, email, password, avatar } = req.body;
        const { error } = signUpValid.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                messages: "Joi: " + errors,
            });
        }
        const existingUser = await checkExistUser(username, email);
        if (existingUser) {
            if (existingUser.username === username) {
                return res.json({
                    mess: "Username is already in use.",
                });
            }
            if (existingUser.email === email) {
                return res.json({
                    mess: "Email is already in use.",
                });
            }
        }
        const newAccount = await signUpAccount(username, email, password, avatar);
        newAccount.password = undefined;
        return res.json({
            mess: "Account created successfully.",
            account: {
                id: newAccount.insertId,
                username,
                email,
                avatar,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: "Sai username" });
        }
        const isPassword = await bcryptjs.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({ message: "Sai password" });
        }

        if (user.is_banned) {
            return res.status(400).json({ message: "Tài khoản này đã bị khoá" });
        }
        user.password = undefined;
        console.log(user);
        const SECRET_KEY = process.env.SECRET_KEY;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1d" });
        return res.json({
            message: "Đăng nhập thành công",
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                token: accessToken,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "error", error: error.message });
    }
};

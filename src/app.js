import express from "express";
import router from "./routes/index.js";
import { connection } from "./config/db.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 3000;

connection
    .execute("SELECT 1")
    .then(() => {
        console.log("✅ Database connected!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`API available at: http://localhost:${PORT}/api`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error.message);
        process.exit(1);
    });

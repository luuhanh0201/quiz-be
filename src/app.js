import express from "express";
import router from "./routes/index.js";
import { connection } from "./config/db.js";

const app = express();

app.use(express.json());

app.use("/api", router);

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

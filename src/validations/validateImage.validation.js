export const validateImage = (req, res, next) => {
    const file = req.file;

    if (!file) {
        return next();
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ message: "Only JPG, PNG, and WEBP images are accepted" });
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return res.status(400).json({ message: "Maximum size of 2MB." });
    }
console.log(123)
    next();
};


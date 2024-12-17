import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        const fileName = file.fieldname + crypto.randomUUID();
        cb(null, fileName);
    }
});

export const upload = multer({
    storage,
});
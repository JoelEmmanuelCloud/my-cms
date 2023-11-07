import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

type File = Express.Multer.File;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const fileFilter = (req: Request, file: File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export { upload };

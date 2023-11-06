import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/')); // Set the destination for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Set the file name
    },
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024, // Limit file size to 1MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true); // Accept only image files
        } else {
            cb(new Error('Please upload an image')); // Reject non-image files
        }
    },
}).single('image');

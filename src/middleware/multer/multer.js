const path = require("path");
const multer = require("multer");
const { HttpException } = require("../../utility/exceptions/httpException");
const { ensureDirectoryExists } = require("../../utility/fileManage.utility");

const pdfUpload = multer.diskStorage({
    destination: async function (req, file, cb) {
        const user = req?.user;
        const payload = req?.body;

        const imageUploadPath = path.resolve(__dirname, `../../../public/uploads/pdfmain`);
        await ensureDirectoryExists(imageUploadPath);
        cb(null, imageUploadPath);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = path.parse(file.originalname).name?.replace(" ", "");
        const uniqueName = `${fileName}_${Date.now()}${ext}`;
        cb(null, uniqueName);
    },
});

const pdfUploadData = multer({
    storage: pdfUpload,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname).toLowerCase();
        if ([".pdf"].includes(ext)) {
            callback(null, true);
        } else {
            return callback(new HttpException(422, "csv file types are supported."));
        }
    },
    // limits: {
    //     fileSize: 1024 * 1024 * 10 // 2 MB file size limit
    // },
});

module.exports = { pdfUploadData };

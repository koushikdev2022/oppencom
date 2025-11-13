const path = require("path");
const multer = require("multer");
const { HttpException } = require("../../../utility/exceptions/httpException");
const { ensureDirectoryExists } = require("../../../utility/fileManage.utility");



const signedPdf = multer.diskStorage({
    destination: async function(req,res,cb){
        // const user = req?.user?.id
        const user = 1
        const payload = req?.payload
        const imagePath = path.resolve(__dirname,`../../../../public/uploads/usersignedpdf/${user}`)
        await ensureDirectoryExists(imagePath);
        cb(null,imagePath)
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname);
        const fileName = path.parse(file.originalname).name?.replace(/\s+/g, "");
        const uniqueName = `${fileName}_${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
})

const signedPdfMulte = multer({
    storage:signedPdf
})



module.exports = {signedPdfMulte}
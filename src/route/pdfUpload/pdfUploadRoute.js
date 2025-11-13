const express = require("express")
const pdfUploadRote = express.Router()
const pdfUploadController = require("../../controller/api/user/pdf/pdfUpload.controller")
const {pdfUploadData}= require("../../middleware/multer/multer")


pdfUploadRote.post("/upload",pdfUploadData.single("pdf"),pdfUploadController.upload)
pdfUploadRote.get("/list",pdfUploadController.list)


module.exports = pdfUploadRote;
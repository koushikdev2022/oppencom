const express = require("express")
const pdfUploadRote = express.Router()
const pdfUploadController = require("../../controller/api/user/pdf/pdfUpload.controller")

pdfUploadRote.post("/upload",pdfUploadController.upload)

module.exports = pdfUploadRote;
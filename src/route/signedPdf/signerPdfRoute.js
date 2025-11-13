const express = require("express")
const signedPdfRoute = express.Router();
const signedPdfController = require("../../controller/api/user/signedPdf/signedPdf.controller")
const {signedPdfMulte}= require("../../middleware/multer/signedPdf/signedPdfMulter")

signedPdfRoute.post("/save",signedPdfMulte.single("pdf"),signedPdfController.save)


module.exports = signedPdfRoute;
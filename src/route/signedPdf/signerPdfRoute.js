const express = require("express")
const signedPdfRoute = express.Router();
const signedPdfController = require("../../controller/api/user/signedPdf/signedPdf.controller")
const {signedPdfMulte}= require("../../middleware/multer/signedPdf/signedPdfMulter")
const { handleBase64Upload } = require("../../middleware/multer/signedPdf/base64Handler");

signedPdfRoute.post("/save",signedPdfMulte.single("pdf"),signedPdfController.save)
signedPdfRoute.post("/save-base64", handleBase64Upload, signedPdfController.save);


module.exports = signedPdfRoute;
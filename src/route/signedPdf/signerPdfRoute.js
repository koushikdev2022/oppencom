const express = require("express")
const signedPdfRoute = express.Router();
const signedPdfController = require("../../controller/api/user/signedPdf/signedPdf.controller")

signedPdfRoute.post("/save",signedPdfController.save)


module.exports = signedPdfRoute;
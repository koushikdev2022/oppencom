const express = require("express");
const loadRoute = express.Router();
const pdfUploadRoute = require("./pdfUpload/pdfUploadRoute")
const signedPdfRoute = require("./signedPdf/signerPdfRoute")

const defaultRoutes = [
    {
        prefix: "/pdf",
        route: pdfUploadRoute,
       
    }
    ,{
        prefix:"/signed",
        route:signedPdfRoute
    }
];

defaultRoutes.forEach((route) => {
    if (route.middleware) {
        loadRoute.use(route.prefix, route.middleware, route.route);
    } else {
        loadRoute.use(route.prefix, route.route);
    }
});


module.exports = loadRoute;
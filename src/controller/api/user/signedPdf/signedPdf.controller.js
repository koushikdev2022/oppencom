const { mailConfig } = require("../../../../config/mailConfig");
const { PdfUrls, UserPdfSign } = require("../../../../models");
const path = require("path");
const ejs = require("ejs")

exports.save = async (req, res) => {
    try {
        const request = req?.file;
        
        if (!request) {
            return res.status(400).json({
                message: "No file uploaded",
                status: false,
                status_code: 400
            });
        }

          const user = req?.body?.id;
        if(!user){
            return res.status(422).json({
                message:"user_id as id required",
                status:false,
                status_code:422
            })
        }
        console.log('File info:', request);
        
        const uploadUrl = `uploads/usersignedpdf/${user}/${request?.filename}`;
        const wholeSalerData = await Wholesaler.findByPk(user)
        if(!wholeSalerData){
            return res.status(400).json({
                message:"user not found",
                status:false,
                status_code:400
            })
        }
        const email = wholeSalerData?.email
        
        
        
        const createPdfSign = await UserPdfSign.create({
            user_pdf_url: uploadUrl,
            type: req?.body?.type,
            pdf_table_id: req?.body?.id,
            user_id: user,
            status: 1
        });
        
        // Fix: Add await to resolve the Promise
        const pathTemplate = path.resolve(__dirname, "../../../../template/pdf.ejs");
        const ejsRender = await ejs.renderFile(pathTemplate, {name: "hello"});
        
        let pdfMsg = {
            from: `"${process.env.SMTP_SENDER_NAME}" <${process.env.SMTP_SENDER_MAIL}>`,
            to: email,
            subject: `HiringEye one time password`,
            html: ejsRender, // Now this is a string, not a Promise
            attachments: [
                {
                    filename: request.originalname || request.filename,
                    path: request.path, 
                    contentType: 'application/pdf'
                }
            ]
        };
        
        let transportConfig = await mailConfig();
        let messageResponse = await transportConfig.sendMail(pdfMsg);
        
        return res.status(201).json({
            message: "PDF saved successfully",
            status: true,
            status_code: 201,
            data: {
                id: createPdfSign.id,
                url: uploadUrl,
                filename: request.filename,
                size: request.size
            }
        });
    } catch (err) {
        console.error('Save error:', err);
        return res.status(400).json({
            message: err.message,
            status: false,
            status_code: 400
        });
    }
};


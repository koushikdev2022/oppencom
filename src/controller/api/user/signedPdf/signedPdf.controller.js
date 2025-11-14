const { PdfUrls, UserPdfSign } = require("../../../../models");

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

        const user = req?.user?.id || 1;
        console.log('File info:', request);
        
        const uploadUrl = `uploads/usersignedpdf/${user}/${request?.filename}`;
        
        const createPdfSign = await UserPdfSign.create({
            user_pdf_url: uploadUrl,
            type: req?.body?.type,
            pdf_table_id: req?.body?.id,
            user_id: user,
            status: 1
        });
        
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

// base64Handler.js
const fs = require('fs');
const path = require('path');
const { ensureDirectoryExists } = require("../../../utility/fileManage.utility");

const handleBase64Upload = async (req, res, next) => {
    try {
        // Check if this is a base64 upload
        if (req.body && req.body.base64File) {
            const user = req?.user?.id || 1;
            const imagePath = path.resolve(__dirname, `../../../../public/uploads/usersignedpdf/${user}`);
            
            await ensureDirectoryExists(imagePath);
            
            // Remove data URL prefix if present (e.g., data:application/pdf;base64,)
            const base64Data = req.body.base64File.replace(/^data:.*?;base64,/, '');
            
            // Convert base64 to buffer
            const buffer = Buffer.from(base64Data, 'base64');
            
            // Generate unique filename
            const fileName = req.body.fileName 
                ? `${path.parse(req.body.fileName).name.replace(/\s+/g, "")}_${Date.now()}.pdf`
                : `file_${Date.now()}.pdf`;
            
            const filePath = path.join(imagePath, fileName);
            
            // Write file synchronously
            fs.writeFileSync(filePath, buffer);
            
            // Attach file info to req object (mimics multer's structure)
            req.file = {
                fieldname: 'pdf',
                originalname: req.body.fileName || 'uploaded.pdf',
                encoding: 'base64',
                mimetype: 'application/pdf',
                destination: imagePath,
                filename: fileName,
                path: filePath,
                size: buffer.length
            };
            
            console.log('Base64 file uploaded:', req.file);
        }
        next();
    } catch (err) {
        console.error('Base64 upload error:', err);
        return res.status(400).json({
            message: 'Failed to process base64 file: ' + err.message,
            status: false,
            status_code: 400
        });
    }
};

module.exports = { handleBase64Upload };

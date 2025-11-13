const {PdfUrls,UserPdfSign} =  require("../../../../models")



exports.upload = async(req,res)=>{
    try{

    }catch(erorr){
        return res.status(400).json({
            status:false,
            status_code:400,
            message:erorr
        })
    }
}
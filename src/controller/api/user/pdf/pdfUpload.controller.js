const {PdfUrls,UserPdfSign} =  require("../../../../models")



exports.upload = async(req,res)=>{
    try{
            const request = req?.file
            console.log(request)
            const uploadUrl = `uploads/pdfmain/${request?.filename}`
            const create = await PdfUrls.create({
                  pdf_url:uploadUrl,
                  type:req?.body?.type,
                  status:1
            })
            return res.status(200).json({
                message:"pdf created",
                status:true,
                status_code:201,
                data:create
            })
    }catch(error){
        return res.status(400).json({
            status:false,
            status_code:400,
            message:error
        })
    }
}


exports.list = async(req,res)=>{
    try{
        const query_id = req?.query?.query_id
        const whereClause = {};

        if (query_id) {
            whereClause.type = query_id;
        }

        
        const results = await PdfUrls.findAll({
            attributes:["pdf_url","type"],
            where: whereClause,
            order:[["id","desc"]],
            limit:1
        });
        return res.status(200).json({
            message:"data found",
            status:true,
            status_code:200,
            data:results,
            baseUrl:process.env.SERVER_URL
        })
    }catch(error){
        console.log(error)
        return res.status(400).json({
            status:false,
            status_code:400,
            message:error?.message
        })
    }
}
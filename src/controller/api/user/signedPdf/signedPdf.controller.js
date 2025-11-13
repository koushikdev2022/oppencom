



exports.save = async(req,res)=>{
    try{
            return res.status(201).json({
                message:"pdf saved",
                status:true,
                status_code:201
            })
    }catch(err){
        return res.status(400).json({
            message:err.message,
            status:false,
            status_code:400
        })
    }
}
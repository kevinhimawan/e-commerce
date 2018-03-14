const Size = require('../model/size.model')

module.exports = {
    addSize(req,res){
        Size.find()
        .exec()
        .then(sizeList=>{
            const checkSize = sizeList.filter(size=>{
                if(size.name.trim().toLowerCase() === req.body.name.trim().toLowerCase()){
                    return size
                }
            })

            if(checkSize.length > 0){
                res.status(409).json({message: 'Size has already been used'})
            }else{
                const {name, description} = req.body
                const newSize = new Size({
                    name,description
                })
                newSize.save((err,response)=>{
                    if(err){return res.status(409).json(err)}
                    res.status(200).json(response)
                })
            }
        })
    }
}
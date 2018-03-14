const Size = require('../model/size.model')

module.exports = {
    addSize(req,res){
        console.log(req.body)
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
    },
    deleteit(req,res){
        Size.deleteMany({'_id': '5aa8b3dd5efcb205427f401e'})
        .then(result=>{
            res.status(200).json(result)
        })
    },
    getit(req,res){
        Size.find()
        .exec()
        .then(sizeData=>{
            console.log(sizeData)
            res.status(200).json(result)
        })
    }
}
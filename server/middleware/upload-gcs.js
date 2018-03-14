const Storage = require('@google-cloud/storage');
const config = {
    // CloudBucket name
    // ProjectID
}

const storage = Storage({
    // projectid
    // keyfilename = hasil downloadan dari GCP text name file
})

const bucket = storage.bucket(config.CloudBucket)

function getPublicUrl(filename){
    return `https://storage.googleapis.com/${config.CloudBucket}/${filename}`
}

function sendUploadToGCS(req,res,next){
    if(!req.file){
        return new ('Upload gagal')
    }
}

const gcsname = Date.now() + '.' + req.file.orignalname.split('.').pop()
const file = bucket.file(gcsname)

const stream = file.createWriteStream({
    metadata:{
        contentType: req.file.mimetype
    }
})

// handle when upload error
stream.on('error',(err)=>{
    req.file.cloudStorageError = err;
    next(err)
})

// handle when upload finish
stream.on('finish',()=>{
    req.file.cloudStorageObject = gcsname;
    file.makePublic()
        .then(()=>{
            req.file.cloudStoragePublicUrl = getPublicUrl
        })
})

module.exports = sendUploadToGCS
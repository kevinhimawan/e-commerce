const Storage = require("@google-cloud/storage")
const config = {
    CLOUD_BUCKET: 'blog.kevinhimawan.xyz',
    PROJECT_ID: 'e-commerce-198004',
}
const storage = Storage({
    projectId: config.PROJECT_ID,
    keyFilename: 'e-commerce-019805aec045.json'
});

// set which bucket
const bucket = storage.bucket(config.CLOUD_BUCKET);

// just a helper to create absolute path to GCS
function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
}

let ImgUpload = {};
// the real middleware

ImgUpload.sendUploadToGCS = (req, res, next) => {
    if (!req.files) {
        return next('upload mungkin gagal');
    }

    const bulkupload = req.files.map((data) => {
        return new Promise((resolve,reject)=>{
            const gcsname = Date.now() + '.' + data.originalname.split('.').pop();
            const file = bucket.file(gcsname);

            // // prepare the stream
            const stream = file.createWriteStream({
                metadata: {
                    contentType: data.mimetype
                }
            });

            // // handle when upload error
            stream.on('error', (err) => {
                data.cloudStorageError = err;
                reject(err)
            });

            // // handle when upload finish
            stream.on('finish', () => {
                data.cloudStorageObject = gcsname;
                file.makePublic(). //make the uploaded file public
                then(() => {
                    data.cloudStoragePublicUrl = getPublicUrl(gcsname);
                    resolve(data.cloudStoragePublicUrl)
                });
            });

            // // write the file
            stream.end(data.buffer);
        })
    })

    Promise.all(bulkupload).then(allready=>{
        console.log('hellooo')
        next()
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = ImgUpload
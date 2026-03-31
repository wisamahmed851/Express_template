const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/');
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.random(Math.random() *  1E9)
        cb(null, file.filename + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage })

module.exports = upload; 


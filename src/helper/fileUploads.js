const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public');
    },
    filename: function(req, file, cb){
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace('/()\s+g','-')
        const uniqueSuffix = Date.now() + '-' + Math.random(Math.random() *  1E9)
       cb(null, name + '-' + uniqueSuffix + ext);
    }
})

const upload = multer({ storage })

module.exports = upload; 


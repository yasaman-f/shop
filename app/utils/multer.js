const Error = require("http-errors")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

function makeAddress(req) {
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = date.getMonth().toString()
    const day = date.getDate().toString()
    const address = path.join(__dirname, "..", "..", "public", "productImageUpload", year, month, day )
    req.body.fileUploadPath = path.join("productImageUpload", year, month, day)
    fs.mkdirSync(address, {recursive: true})
    return address
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file?.originalname) {
        const filePath = makeAddress(req);
        return cb(null, filePath);
      }
      cb(null, null);
    },
    filename: (req, file, cb) => {
      if (file.originalname) {
        const ext = path.extname(file.originalname);
        const fileName = String(new Date().getTime() + ext);
        req.body.filename = fileName;
        return cb(null, fileName);
      }
      cb(null, null);
    },
  });

function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname)
    const format = [".jpeg", ".jpg", ".webp", ".gif", ".png"]
    if(!format.includes(ext)){
        return cb(Error.BadRequest("The image format is incorrect"))
    }else{
        return cb(null, true)
    }
}

const max = 1000 * 1000

const uploadImage = multer({storage, fileFilter, limits: { fileSize: max }})

module.exports = {
    uploadImage
}
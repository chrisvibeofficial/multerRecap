const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => { 
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    new Error('Invalid file: Image only')
  }
};

const limits = {
  limits: 1024 * 1024 * 10
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload
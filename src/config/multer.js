const multer = require('multer');
const path = require('path');

const storageTypes = {
  local: multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (request, file, cb) => {  
      file.key = `${Date.now()}-${file.originalname}`;

      cb(null, file.key);
    }
  }),
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (request, file, cb) => {
    const types = [
      'image/jpeg',
      'image/pjpeg',
      'image/png'
    ];
    
    if(types.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de arquivo não permitido.'));
    }
  }
}
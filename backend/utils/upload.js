const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to store files
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter configuration
const fileFilter = (req, file, cb) => {
  // Different validation for photos vs documents
  if (file.fieldname === 'photo') {
    // Only allow image files for photos
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, etc.) are allowed for resident photos'), false);
    }
  } else if (file.fieldname === 'document') {
    // Allow various document types
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, Word, text, or image documents are allowed'), false);
    }
  } else {
    // For any other field names (shouldn't happen in our case)
    cb(new Error('Unexpected file field'), false);
  }
};

// Configure multer instance
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for all files
    files: 2 // Maximum of 2 files (photo + document)
  }
});

module.exports = upload;

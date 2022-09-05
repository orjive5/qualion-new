const express = require('express');

const app = express();
const path = require('path');
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const multer = require('multer');
const cloud = cloudinary.v2;

require('dotenv').config();

const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const checkAuth = require('./utils/checkAuth');

//CONNECT TO MONGO_DB

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB');
  }
);

// MIDDLEWARE

// Cloudinary

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloud,
  params: {
    folder: 'uploaded-images',
    public_id: (req, file) =>
      `${file.originalname.split('.')[0]}-${Date.now()}`,
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|webp|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
}

//Multer
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

//Cors
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(helmet());
app.use(morgan('common'));

//ROUTES

app.use('/auth', authRoute);
app.use('/posts', postsRoute);

app.get('/protected', checkAuth, (req, res) => {
  res.send('Welcome to protected route!');
});

//Upload image
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `${req.file.path}`,
    public_id: `${req.file.filename}`,
  });
});

//Delete uploaded image from Cloudinary
app.delete(
  '/delete-image/:container/:public_id',
  checkAuth,
  async (req, res) => {
    try {
      const imageId = `${req.params.container}/${req.params.public_id}`;
      cloudinary.v2.uploader
        .destroy(imageId, (error, result) => {
          console.log(result, error);
        })
        .then((response) => console.log(response))
        .catch((er) => console.log(er));
      res.json({
        message: 'Image deleted',
      });
    } catch (err) {
      console.log(err);
    }
  }
);

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is OK');
});

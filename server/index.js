const express = require('express');
const app = express();

const multer = require('multer');

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
        console.log('Connected to MongoDB')
    }
);

//MIDDLEWARE

//Multer
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(helmet());
app.use(morgan('common'));

//ROUTES

app.use('/auth', authRoute);
app.use('/posts', postsRoute);

//Upload image
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
})

app.listen(8000, () => {
    console.log('Server is OK')
});
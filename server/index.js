const express = require('express');
const app = express();
const fs =require('fs')

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
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

//Cors
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(helmet());
app.use(morgan('common'));

//ROUTES

app.use('/auth', authRoute);
app.use('/posts', postsRoute);

app.get('/protected', checkAuth, (req, res) => {
    res.send('Welcome to protected route!')
});

//Upload image
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.filename}`
    });
})

//Delete uploaded image
app.delete('/delete-image/:imageName', checkAuth, async (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = `./uploads/${imageName}`;
    fs.unlink(imagePath, (err) => {
        res.json({
            message: 'Image deleted successfully!'
        })
        if (err) {
            console.error(err)
            return
        }
    })
});

app.listen(8000, () => {
    console.log('Server is OK')
});
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

require('dotenv').config(); 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



const applicationSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    coverLetter: String,
    resume: String,
});


const formDataSchema = new mongoose.Schema({
    username: String,
    number: Number,
    email: String,
    message: String
});

const Application = mongoose.model('Application', applicationSchema);

const Contact = mongoose.model('Contact', formDataSchema);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(express.static('public'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });


app.post('/submit', upload.single('resume'), async (req, res) => {
    const newApplication = new Application({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        coverLetter: req.body.coverLetter,
        resume: req.file.filename,
    });

    try {
        await newApplication.save();
        res.sendFile(path.join(__dirname, 'public', 'Success.html'));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving application.');
    }
});

app.post('/submit-form', (req, res) => {
    const contact = new Contact({
        username: req.body.username,
        number: req.body.number,
        email: req.body.email,
        message: req.body.message
    });

    contact.save()
        .then(() => {
            res.sendFile(path.join(__dirname, 'public', 'Success.html'));
        })
        .catch(err => {
            res.status(400).send('Error saving form data: ' + err);
        });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contect', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contect.html'));
});

app.get('/About', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'About.html'));
});
app.get('/career', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'career.html'));
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

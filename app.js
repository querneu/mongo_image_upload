require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const db = require('./helper/db')();
const multer = require('multer');
const img = require('./api/model/Img');
const port = process.env.PORT || '3000';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}`);
    }
})

const upload = multer({ storage: storage });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.post('/', upload.single('image'), (req, res, next) => {
    const obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(`${__dirname}/uploads/${req.file.filename}`)),
            contentType: 'image/png'
        }
    }

    img.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            item.save();
            res.redirect('/');
        }
    });
});


app.get('/', (req, res) => {
    img.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err
            });
        } else {
            res.render('imagesPage', { items: items });
        }
    });
});




app.listen(port, err => {
    if (err) {
        throw err
    } else {
        console.log(`Servidor ouvindo a porta ${port}`);
    }
});
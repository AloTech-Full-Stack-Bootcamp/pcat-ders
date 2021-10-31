const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const photoController = require('./controller/photoController');
const pageController = require('./controller/pageController');
const app = express();

mongoose.connect(
    'mongodb+srv://admin:HV2XA17yDloc4G1A@cluster0.gk5w0.mongodb.net/test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

app.use(function (req, res, next) {
    console.log('Request:', req.path);
    next();
});
app.set('view engine', 'ejs');

app.get('/', photoController.getAllPhotos);

app.get('/about', pageController.getAboutPage);

app.get('/add', pageController.getAddPage);

app.post('/photo', photoController.createPhoto);

app.get('/photo/:id', photoController.getPhotoById);

app.put('/photo/:id', photoController.editPhoto);

app.get('/photos/edit/:id', pageController.getEditPage);

app.delete('/photos/:id', photoController.deletePhoto);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});

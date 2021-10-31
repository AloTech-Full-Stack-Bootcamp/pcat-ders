const Photo = require('../model/Photo');
const fs = require('fs');

exports.createPhoto = function (req, res) {
    const uploadDir = './public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name,
        });
        res.redirect('/');
    });
};

exports.getAllPhotos = async function (req, res) {
    const currentPage = req.query.page || 1;
    const photosPerPage = 3;
    const totalPhotos = await Photo.find().countDocuments();

    const photos = await Photo.find({})
        .sort('-dateCreated')
        .skip((currentPage - 1) * photosPerPage)
        .limit(photosPerPage);
    res.render('index', {
        photoList: photos,
        pages: Math.ceil(totalPhotos / photosPerPage),
        currentPage: currentPage,
    });
};

exports.getPhotoById = async function (req, res) {
    const photoById = await Photo.findById(req.params.id);

    res.render('photo', {
        photo: photoById,
    });
};

exports.editPhoto = async function (req, res) {
    const photoById = await Photo.findById(req.params.id);
    photoById.title = req.body.title;
    photoById.description = req.body.description;
    photoById.save();

    res.redirect('/photo/' + req.params.id);
};

exports.deletePhoto = async function (req, res) {
    const photo = await Photo.findById(req.params.id);
    let deletedPhotoPath = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedPhotoPath);
    await Photo.findByIdAndRemove(req.params.id);
    res.redirect('/');
};

const Photo = require('../model/Photo');

exports.getAboutPage = function (req, res) {
    res.render('about');
};

exports.getAddPage = function (req, res) {
    res.render('add');
};

exports.getEditPage = async function (req, res) {
    const photoById = await Photo.findById(req.params.id);
    res.render('edit', {
        photo: photoById,
    });
};

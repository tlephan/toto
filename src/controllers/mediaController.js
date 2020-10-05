var mediaController = {}

const multer = require("multer");

const upload = multer({
    dest: "/var/toto/static"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });

mediaController.upload = async function(req, res) {
    try {
        res.render('login', {});
    } catch (err) {
        // Verify token failed and render login
        res.render('error', {});
    }
};

module.exports = mediaController;
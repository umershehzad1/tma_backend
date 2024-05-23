'use strict'

let path = require('path');
let fs = require('fs');
let json = require('../../../Traits/ApiResponser');

/*
|--------------------------------------------------------------------------
| Upload Controller
|--------------------------------------------------------------------------
|
| This controller handles all image upload attachments in the application
| The controller uses a trait to conveniently provide its functionality
| to your applications.
|
*/

let o = {};

o.upload = function(req, res) {
    if (!req.file) {
        return json.errorResponse(res, "No file attached!", 404);
    }

    let extension = (!req.body.extension) ? "jpg" : req.body.extension;
    let filename = Date.now() + '.' + extension;
    let destination = path.join(__dirname, '../../../../public/uploads');

    // Ensure the directory exists
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    // Construct the file URL correctly
    let serverAddress = req.protocol + '://' + req.headers.host + '/public/uploads/';
    let newFile = {
        target: serverAddress + filename,
    };

    fs.writeFile(path.join(destination, filename), req.file.buffer, function(err) {
        if (err) {
            console.log(err);
            return json.errorResponse(res, "Write file to server failed!");
        }

        json.successResponse(res, newFile);
    });
};

module.exports = o;

var express = require('express')
var multer  = require('multer')
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null,Date.now()+file.originalname);
    }
})
var upload = multer({ storage: storage });

var app = express()

app
    .get('/', (req, res)=> {
        res.render('formulaire.ejs');
    })
    .post('/upload',function(req,res) {
        var upload = multer({storage: storage, fileFilter: function (req, file, callback) { //ajout d'un filtre de format
                var ext = path.extname(file.originalname);
                if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') { //condition sur les formats acceptes
                    return callback(new Error('Only images are allowed'))
                }
                callback(null, true)}
        }).single('userFile');//methode any remplacee par single : un seul fichier à la fois

        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    })

//Define port
const PORT = process.env.PORT || 8080;

app.listen(PORT,function(){
    console.log("Working on port " + PORT);
});
var express = require('express')
var multer  = require('multer')

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
    .post('/upload', upload.any(), (req, res)=> {
        res.end('Merci !');
    });

//Define port
const PORT = process.env.PORT || 8080;

app.listen(PORT,function(){
    console.log("Working on port " + PORT);
});
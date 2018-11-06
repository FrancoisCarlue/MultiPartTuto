var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var fs = require('fs');

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        fs.mkdir('./uploads', function(err) {
            if(err) {
                console.log(err.stack)
            } else {
                callback(null, './uploads');
            }
        })
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

app.post('/api/file',function(req,res){
    var upload = multer({ storage : storage}).single('userFile');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

//Define port
const PORT = process.env.PORT || 8080;

app.listen(PORT,function(){
    console.log("Working on port " + PORT);
});
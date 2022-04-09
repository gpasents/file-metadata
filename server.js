var express = require('express');
var fileUpload = require('express-fileupload');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(fileUpload());
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse",(req,res,next)=>{
  if(!req.files||Object.keys(req.files).length===0){
    res.send("Error: No files found");
  }else{
    let file = req.files.upfile;
    console.log(req.files.upfile);
    res.json({"name":file.name,"type":file.mimetype,"size":file.size});
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

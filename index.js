const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// -= Set Static Files =-

// /public
app.use(express.static('public'));

// -= Routing =-

// Home Page
app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname + "/public/pages/home.html"));
});
// About Page
app.get('/about', function(req, res){
    res.sendFile(path.resolve(__dirname + "/public/pages/about.html"));
});
// Test Error Page
app.get('/error', function(req, res){
    var err = new Error("Test Error");
    next(err);
})

// -= Error Handling =-

// 404 Error
app.use(function(req, res, next){
    res.status(404).sendFile(path.resolve(__dirname + "/public/pages/404-page.html"));
});
//500 Error
app.use(function(err, req, res, next){
    res.status(500).sendFile(path.resolve(__dirname + "/public/pages/500-page.html"));
});

app.listen(port, () => console.log('Listening on port: ' + port));
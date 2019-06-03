// Required packages
const express = require('express');
const path = require('path');
const express_handlebars = require('express-handlebars');
const body_parser = require('body-parser');
const helper = require('./custom-modules/helper-functions');
const db_helper = require('./custom-modules/db-helper-functions');
const promise = require("promise");
var cors = require('cors');

// Set up express
const app = express();
const port = 3001;


// Set up parser for forms
var urlencodedParser = body_parser.urlencoded({ extended: false });



// API Routes
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

app.get('/api/getAll', (req, res, next) => {
    db_helper.getAll(function(output){
        res.json({data: output});
    });
});
app.get('/api/getOne', (req, res) => {
    var title = req.query.title;
    db_helper.getOne(title, function(output){
        res.json({data: output});
    });
});
app.get('/api/delete', (req, res) => {
    if(req.query.title){
        var title = req.query.title;
        db_helper.deleteItem(title, function(output){
            res.json(output);
        });
    }
});
app.post('/api/update', (req, res) => {
    var addItem = {
        title: req.body.addTitle,
        content: req.body.addContent
    }
    db_helper.updateItem(addItem, function(output){
        res.json(output);
    });
});

// Test Error Page
app.get('/error', (req, res) => {
    var err = new Error("Test Error");
    next(err);
})

// -= Error Handling =-

// 404 Error
app.use((req, res, next) => {
    res.status(404).sendFile(path.resolve(__dirname + "/public/pages/404-page.html"));
});
//500 Error
app.use((err, req, res, next) => {
    res.status(500).sendFile(path.resolve(__dirname + "/public/pages/500-page.html"));
});

app.listen(port, () => console.log('Listening on port: ' + port));
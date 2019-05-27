// Required packages
const express = require('express');
const path = require('path');
const express_handlebars = require('express-handlebars');
const body_parser = require('body-parser');
const helper = require('./custom-modules/helper-functions');
const db_helper = require('./custom-modules/db-helper-functions');
const promise = require("promise");

// Set up express
const app = express();
const port = 3000;

// Set up handlebars

app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set up parser for forms
var urlencodedParser = body_parser.urlencoded({ extended: false });

// -= Set Static Files =-

// /public
app.use(express.static('public'));

// -= Routing =-

// Home Page
app.get('/', (req, res) => {
    db_helper.getAll((output) => {
        var data = {item_list: output};
        res.render('home', data);
    });
});
app.get('/get', (req, res) => {
    console.log(req.query);
    if(req.query.title){
        var title = req.query.title;
        db_helper.getOne(title, function(output){
            res.end(JSON.stringify(output));
        });
    }
    else{
        var title = req.query.title;
        db_helper.getAll(function(output){
            res.end(JSON.stringify(output));
        })
    }
});
app.get('/delete', (req, res) => {
    if(req.query.title){
        var title = req.query.title;
        db_helper.deleteItem(title, function(output){
            var del_data = {item_deleted: output};
            res.render("delete", del_data);
        });
    }
});
app.get('/add', (req, res) => {
    console.log("GET add");
    res.render("add");
});
app.post('/add', urlencodedParser, (req, res) => {
    console.log("POST add");
    var addItem = {
        title: req.body.addTitle,
        content: req.body.addContent
    }
    db_helper.updateItem(addItem, function(output){
        var add_data = {item_added: output};
        res.render("add", add_data);
    });
});
app.post('/detail', urlencodedParser, (req, res) => {
    var searchTerm = req.body.searchTitle;
    db_helper.getOne(searchTerm, function(output){
        // If the item was not in the list
        if(output === "Item Not Found"){
            var detail_data = {
                search_result: '"'+searchTerm+'" was not found in the list.',
                search_found: false
            };
        }
        // If the item was in the search result
        else{
            var detail_data = {
                search_result: 'Successfully found "'+searchTerm+'"',
                search_found: true,
                search_title: output.title,
                search_content: output.content
            };
        }
        res.render('details', detail_data);

    });
});
// About Page
app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname + "/public/pages/about.html"));
});

// API Routes
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

app.get('/api/getAll', (req, res, next) => {
    db_helper.getAll(function(output){
        res.json(output);
    });
});
app.get('/api/getOne', (req, res) => {
    var title = req.query.title;
    db_helper.getOne(title, function(output){
        res.json(output);
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
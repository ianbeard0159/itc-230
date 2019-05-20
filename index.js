// Required packages
const express = require('express');
const path = require('path');
const express_handlebars = require('express-handlebars');
const body_parser = require('body-parser');
const helper = require('./custom-modules/helper-functions');

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
app.get('/', function(req, res){
    var data = {item_list: helper.getAll()};
    res.render('home', data);
});
app.get('/get', function(req, res){
    console.log(req.query);
    if(req.query.title){
        var title = req.query.title;
        res.end(JSON.stringify(helper.get(title)));
    }
    else{
        res.end(JSON.stringify(helper.getAll()));
    }
});
app.get('/delete', function(req, res){
    if(req.query.title){
        var del_data = {item_deleted: helper.delete(req.query.title)};

        res.render("delete", del_data);
    }
});
app.get('/add', function(req, res){
    console.log("GET add");
    res.render("add");
});
app.post('/add', urlencodedParser, function(req, res){
    console.log("POST add");
    var addItem = {
        title: req.body.addTitle,
        content: req.body.addContent
    }
    var add_data = {item_added: helper.add(addItem)};
    res.render("add", add_data);
});
app.post('/detail', urlencodedParser, function(req, res){
    var searchTerm = req.body.searchTitle;
    var response = helper.get(searchTerm);
    // If the item was not in the list
    if(response === "Item Not Found"){
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
            search_title: response.title,
            search_content: response.content
        };
    }
    res.render('details', detail_data);
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
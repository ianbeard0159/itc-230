// Required packages
const express = require('express');
const path = require('path');
const express_handlebars = require('express-handlebars');
const body_parser = require('body-parser');
const querystring = require('querystring');
const as2 = require('./custom-modules/assignment2-mod');

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
    var data = {item_list: as2.getAll()};
    res.render('home', data);
});
app.get('/get', function(req, res){
    console.log(req.query);
    if(req.query.title){
        var title = req.query.title;
        res.end(JSON.stringify(as2.get(title)));
    }
    else{
        res.end(JSON.stringify(as2.getAll()));
    }
});
app.get('/delete', function(req, res){
    if(req.query.title){
        var title = req.query.title;
        var data = {item_deleted: as2.delete(req.query.title)};

        res.render("delete", data);
    }
});
app.post('/detail', urlencodedParser, function(req, res){
    var searchTerm = req.body.searchTitle;
    var response = as2.get(searchTerm);
    // If the item was not in the list
    if(response === "Item Not Found"){
        var data = {
            search_result: '"'+searchTerm+'" was not found in the list.',
            search_found: false
        };
    }
    // If the item was in the search result
    else{
        var data = {
            search_result: 'Successfully found "'+searchTerm+'"',
            search_found: true,
            search_title: response.title,
            search_content: response.content
        };
    }
    res.render('details', data);
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
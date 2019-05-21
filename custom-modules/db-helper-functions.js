const dbItem = require("../models/db-item.js");

// -= Get All =-
exports.getAll = (callback) => {
    var output = [];
    dbItem.find({}, (err, items) => {
        if(err){
            callback(next(err));
        }
        for(var i = 0; i < items.length; i++){
            var item = {
                title: items[i].title,
                content: items[i].content
            };
            output.push(item);
        }
        callback(output);
    });
};

// -= Get One =-
exports.getOne = (inTitle, callback) => {
    var output = "";
    dbItem.find({"title": inTitle}, (err, result) => {
        if(err){
            callback(next(err));
        }
        // If the item was found in the database
        if(result[0]){
            output = {
                title: result[0].title,
                content: result[0].content
            }
        }
        // If it was not found in the database
        else{
            output = "Item Not Found";
        }
        callback(output);
    });
};
// -= Delete =-
exports.deleteItem = (inTitle, callback) => {
    dbItem.deleteOne({'title':inTitle}, (err, result) => {
        if(err){
            return next(err);
        } 
        console.log("delete");
        // If the item was not in the list
        if(result.deletedCount == 0){
            output = inTitle + " was not found in the list";
        }
        // If the item was deleted
        else{
            output = inTitle + " has been deleted";
        }
        callback(output);
    }); 
};

// -= Update/Insert =-
exports.updateItem = (newItem, callback) => {
    // Find out if the item is already in the list
    dbItem.find({"title": newItem.title}, (err, result) => {
        if(err){
            callback(next(err));
        }
        // If the item was found in the database
        if(result[0]){
            var flag = true;
        }
        // If it was not found in the database
        else{     
            var flag = false;
        }

        // Update the item
        dbItem.updateOne({'title':newItem.title}, newItem, {upsert:true}, (err, upResult) => {
            if (err) return next(err);
            // If the item was not updated
            if(!flag){
                output = "'" + newItem.title + "' was added to the list";
            }
            else if(upResult.nModified != 0){
                output = "'" + newItem.title + "' was modified";
            }
            else{
                output = "'" + newItem.title + "' is already in the list";
                console.log(upResult);
            }
            callback(output);
        }); 
    });
};
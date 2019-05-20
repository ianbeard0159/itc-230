var items = [
    {
        title: "thing-1",
        content: "content of thing-1"
    },
    {
        title: "thing-2",
        content: "content of thing-2"
    },
    {
        title: "thing-3",
        content: "content of thing-3"
    },
    {
        title: "thing-4",
        content: "content of thing-4"
    },
    {
        title: "thing-5",
        content: "content of thing-5"
    }
];
exports.itemArray = items;

exports.getAll = function(){
    var output = items;
    return output;
};
exports.get = function(inTitle){
    // Return the title of the item if it is found within the array
    var output = items.find(function(item){
        return item.title === inTitle;
    });
    // Otherwise, return item not found
    if(output == null){
        output = "Item Not Found";
    }
    return output;
};
exports.delete = function(inTitle){
    var del = null;
    var output = "";
    // If the desired item is found, set the 'del' flag to that item's index
    for(var i = 0; i < items.length; i++)
    {
        if(items[i].title == inTitle){
            del = i;
        }
    }

    // If the 'del' flag was not set, return that the object was not found
    if(del === null){
        output = inTitle + " was not found in the list";
    }
    // If it was set, delete the item in that index and return that the item was deleted
    else{
        output = items[del].title + " has been deleted";
        items.splice(del, 1);
    }
    return output;
};
exports.add = function(inItem){
    // If theere is no item in the list with the same title as the input item
    var output = "";
    var inList = false;
    for(var i = 0; i < items.length; i++){
        if(items[i].title == inItem.title){
            inList = true;
        }
    }
    if(!inList){
        items.push(inItem);
        output = "'" + inItem.title + "' was added to the list";
    }
    else{
        output = "'" + inItem.title + "' is already in the list";
    }
    return output;
};
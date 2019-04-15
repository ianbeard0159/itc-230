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
exports.getAll = function(){
    var output = items;
    console.log("Get All");
    return output;
};
exports.get = function(inTitle){
    var output = items.find(function(item){
        return item.title === inTitle;
    });
    console.log("Get One");
    if(output == null){
        output = "Item Not Found";
    }
    return output;
};
exports.delete = function(inTitle){
    var del = null;
    var output = "";
    for(var i = 0; i < items.length; i++)
    {
        console.log("loop " + i);
        if(items[i].title == inTitle){
            console.log("found");
            del = i;
        }
    }
    if(del){
        console.log(items[del]);
        output = items[del].title + " has been deleted";
        items.splice(del, 1);
    }
    else{
        output = inTitle + " was not found in the list";
    }
    console.log("delete");
    return output;
};
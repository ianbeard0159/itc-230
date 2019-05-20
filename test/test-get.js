const expect = require("chai").expect;
const assert = require("assert");
const helpers = require("../custom-modules/helper-functions");

// -= Test get =-
describe("get(inTitle)", function(){
    // If an item with the correct title is found within the items array, return the item
    context("For each object in the array", function(){
        // For each item in the items array
        for(var i = 0; i < helpers.itemArray.length; i++){
            var currentItem = helpers.itemArray[i];
            var currentTitle = helpers.itemArray[i].title;
            it("Should return the " + currentTitle + " object if it was found in the array", function(){
                var getOutput = helpers.get(currentTitle);
                assert.equal(getOutput, currentItem);
            });
        }
    });
    // In any other case, return "Item Not Found"
    context("For any value not found in the array", function(){
        it("Should return 'Item Not Found' if any other value it passed to the function", function(){
            var getOutput = helpers.get("Not a thing");
            assert.equal(getOutput, "Item Not Found");
        });
    });
});

// Test add
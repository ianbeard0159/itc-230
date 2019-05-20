const expect = require("chai").expect;
const assert = require("assert");
const helpers = require("../custom-modules/helper-functions");

// Test delete
describe("add(inItem)", function(){
    // If the desired item was in the array, it should return that the item already exists
    var existingItem = {
        title: "thing-2",
        content: "content of thing-2"
    }
    var newItem = {
        title: "new-thing",
        content: "content of new-thing"
    }
    context("If the desired item was already in the array", function(){
        it("Should return that the item was already in the list", function(){
            var addOutput = helpers.add(existingItem);
            assert.equal(addOutput, "'" + existingItem.title + "' is already in the list");
        });
    });
    // If the desired item was not in the array, then It should add the item and then return that
    //     the item was sucessfully added
    context("if the item was in the array", function(){
        var deleteOutput = "";
        // Before running delete
        it("Was not the array before running the function", function(){
            assert.equal(helpers.get(newItem.title), "Item Not Found");
        });
        // After running delete
        it("Was in the array after running the function", function(){
            deleteOutput = helpers.add(newItem);
            assert.equal(helpers.get(newItem.title), newItem);
        });
        it("Should return that the item was added", function(){
            assert.equal(deleteOutput, "'" + newItem.title + "' was added to the list");
        });
    })
});
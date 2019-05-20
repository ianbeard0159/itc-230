const expect = require("chai").expect;
const assert = require("assert");
const helpers = require("../custom-modules/helper-functions");

// Test delete
describe("detete(inTitle)", function(){
    // If the desired item was not in the array, it should return that the item was not found
    context("If the desired item was not in the array", function(){
        it("Should return that the item was not found", function(){
            var deleteOutput = helpers.delete("Not a thing");
            assert.equal(deleteOutput, "Not a thing was not found in the list");
        });
    });
    // If the desired item was in the array, then It should delete the item and then return that
    //     the item was sucessfully deleted
    context("if the item was in the array", function(){
        var deleteOutput = "";
        // Before running delete
        it("Was in the array before running the function", function(){
            assert.equal(helpers.get("thing-1").title, "thing-1");
        });
        // After running delete
        it("Was not in the array after running the function", function(){
            deleteOutput = helpers.delete("thing-1");
            assert.equal(helpers.get("thing-1"), "Item Not Found");
        });
        it("Should return that the item was found", function(){
            assert.equal(deleteOutput, "thing-1 has been deleted");
        });
    })
});
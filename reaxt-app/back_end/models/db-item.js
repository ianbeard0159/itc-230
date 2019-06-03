const mongoose = require("mongoose");
const credentials = require("../git-ignore/db-credentials.js");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
const connectionString = "mongodb+srv://program-user:" + credentials.dbPassword + "@cluster0-57fcj.mongodb.net/test?retryWrites=true";

mongoose.connect(connectionString, { useNewUrlParser: true }, function(error){
  if(error){
    console.log(error)
  };
}); 
mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Book model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 title: { type: String, required: true },
 content: String
}); 

module.exports = mongoose.model('Item', mySchema);
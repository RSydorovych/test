
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Data = new Schema({
    owner    : String, 
    name     : String,
    summ     : Number
});

mongoose.model( 'Data', Data );
mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://localhost/companies' );


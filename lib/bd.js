
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Data = new Schema({
    owner    : String, 
    name     : String,
    summ     : Number
});

mongoose.model( 'Data', Data );
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://RSydorovych:20091988@ds053186.mlab.com:53186/systembdbdbdbdbddb');

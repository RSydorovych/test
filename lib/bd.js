
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Data = new Schema({
    owner    : String, 
    name     : String,
    summ     : Number
});

mongoose.model( 'Data', Data );
mongoose.Promise = global.Promise;
//mongoose.connect( 'mongodb://localhost:27017/companies' );

mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

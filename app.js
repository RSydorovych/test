/// SERVER
require( './lib/bd' );

var express    =  require('express');
var templates  =  require('consolidate');
var morgan     =  require('morgan');
var request    =  require('request');
var urlutils   =  require('url');
var path       =  require ('path');
var favicon    =  require('serve-favicon');
var bodyParser =  require('body-parser');
var methodOverride = require( 'method-override' );

var app = express();

var routes = require( './controller/routes' );

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.set('views', path.join(__dirname, 'views'));
app.use( methodOverride());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/static', express.static(__dirname + '/public'));

app.engine('hbs', templates.handlebars);
app.set('view engine', 'hbs');
app.use(morgan('dev'));  // log every request to the console


app.get('/', routes.index );
app.get('/create', routes.getCreate );
app.get('/:id', routes.getId );

app.post('/create', routes.postCreate)
app.post('/:id', routes.postId)

app.all('*', function (req, res) {res.render('error.hbs')})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

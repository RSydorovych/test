
var deasync = require('deasync');

var mongoose = require( 'mongoose' );
var Data     = mongoose.model( 'Data' );
var str  = ''; 
var summ = 0 ;

//////////////////////////////////////////////////////////////   
exports.getCreate = function (req, res, next) {

      Data.find().exec(function (err, result) {
         if (err) return next(err);
         var str = '';
         result.forEach(function (record) {

            var tmp = '<option value="&1">&2</option>';

            tmp = tmp.replace('&1', record.name);
            tmp = tmp.replace('&2', record.name);
            
            str = str + tmp;

         });
         
         res.render('company.hbs', {
            option: str
         });
      });
      
   };

   
//////////////////////////////////////////////////////////////   
exports.getId = function (req, res, next) {
      if (!req.params || !req.params.id) {
         res.render('error.hbs');
      };
      var id = req.params.id;  

      Data.findById(id, function (err, data) {
         if (err) {
            res.render('error.hbs');
         }
         if (data==null) {
            res.render('error.hbs');
         }else{

         tmp = {};
         tmp.id      = id;
         tmp.company = data.name;
         tmp.money   = data.summ;
         tmp.owner   = data.owner;
         console.log(data.owner)
         res.render('company.hbs',tmp);
         }
      })
   };

//////////////////////////////////////////////////////////////   
exports.postCreate = function (req, res, next) {
     
   if (!req.body) {
      return next(new Error('No data provided.'))
   }
   
   if (req.body.submit == 'delete') { app.get('/') }
   
   var company = req.body.company;
   var money = req.body.money;
   var owner = (req.body.owner == 'undefined' || req.body.owner == '') ? '' : req.body.owner;
   
   new Data({name: company, owner: owner, summ: money}).save(function (err, data, count) {
      if (err) return next(err);
         console.log(data);
         res.redirect('/');
   });

};

//////////////////////////////////////////////////////////////
exports.postId = function (req, res, next) {

   if (!req.body || (!req.body.Сompany_id || !req.body.name)) {
      next()
   }

   var id = req.body.Сompany_id;

   if (req.body.submit == 'delete') {
            
       Data.findById( id, function ( err, todo ){

          Data.find({owner: todo.name}).sort('_id').exec(function (err, result) {

              result.forEach(function(item, i, dataArrey) {
               
               
                Data.findById(item._id, function (err, finds) {
                   finds.owner = todo.owner;
                   finds.save(function (err, finds, count) {
                   });
                });
              }) 

               todo.remove( function ( err, todo ){
             //       res.send({err: 0, redirectUrl: "/"});           
               }); 
          })                                                      
   })
                 
   } else {
 
     Data.findById( id, function ( err, todo ){

        todo.name     = req.body.company;
        todo.money    = req.body.money;
        todo.owner    = (req.body.owner == 'undefined' || req.body.owner == '') ? '' : req.body.owner; ;

       todo.save( function ( err, todo, count ){
         if( err ) return next(); });
     });
   
   }
 res.redirect('/')
};

   
//////////////////////////////////////////////////////////////
exports.index = function (req, res, next) {
    
   var elem = '';
   var treegrid = 1;
   var parent = 1;
   str = '';
   
   findData(elem, treegrid, parent);
   
   res.render('index.hbs', {
      'list': str
   });
};
   


   

function findData (p, treegrid, parent, summ) {
    
   var done = false;
     
   var dataArrey = [];

   Data.find({owner: p}).sort('_id').exec(function (err, result) {
      if (err) {
         done = true;   
      };
       dataArrey = result ;
       console.log(dataArrey)
       done = true;
   })

   
   
while (done==false) {
   require('deasync').sleep(10);
}
  
   

dataArrey.forEach(function(item, i, dataArrey) {
        
      treegrid = treegrid + 1; 
      var company = item.name ;
      var owner   = item.owner;
      var money   = item.summ ;
      var ID      = item._id; ; 
      
      var tmp     = '<tr class="treegrid-&1 treegrid-parent-&2"><td><a href="/&3">&4</a></td><td>&5</td><td>&6</td></tr>';

      tmp = tmp.replace('&1', treegrid);
      tmp = tmp.replace('&2', parent);
      tmp = tmp.replace('&3', ID);
      tmp = tmp.replace('&4', company);
      tmp = tmp.replace('&5', money);
      tmp = tmp.replace('&2', parent);     
       
      str = str + tmp ; 
      var owner = item.name ;   
      
   
      if(owner!==''){
        var summTree = money 
        findData(owner, treegrid, treegrid, summ);   
      }
             

      str = str.replace('&6', 0);
      
});

};
   

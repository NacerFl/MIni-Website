let express = require('express');
let app = express();
let session = require('express-session');
let ejs = require('ejs');
var bodyParser = require('body-parser');

let datab = require('./config/db');

  



app.set('view engine', 'ejs');

app.use(express.static('./public'));




app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(require('./middleware/flash'))




app.get('/', function(request, response) {

	
	
	response.render('./index');

});

//post du memo 
app.post('/memo', function(request,response) {

	if(request.body.memo){
		datab.query('INSERT INTO mydb.Memo SET ?',request.body.memo, function(error, result, fields) {

			request.flash('success',"GG message poster");
			response.redirect('/acceuil');

		});
	}else {
	if(request.body.memo === undefined || request.body.memo === ''){

		request.flash('error',"Pas de message renter ");
		response.redirect('/acceuil',);
	}

}

	});

//contenue du memo afficher dans liste des memo 
app.post('/memo2', function(request,response) {

	var MEMO = request.session.memo;

	if(memo){

		datab.query('SELECT * FROM mydb.Memo', function(error, results, fields){

			if (error) throw error;

			response.render('./acceuil', {contenue:request.session.memo})
		});


	}
	
});	


//login
app.post('/login', function(request, response) {
	var nom = request.body.nom;
	var mdp = request.body.mdp;
	if (nom && mdp) {
		datab.query('SELECT * FROM mydb.User WHERE nom = ? AND mdp = ?', [nom, mdp], function(error, results, fields) {
            if (error){ throw (error);};
            
			if (results.length > 0) {
                var s = results[0].nom;
				request.session.loggedin = true;
				request.session.username = nom;
				request.session.opp = 1;
                response.redirect(('./acceuil'));
                console.log(results);
                console.log(results[0].nom);// probleme d'affichage du login
			} else {
				request.flash('error',"Nom ou MDP incorrect ");
				response.redirect('/');

			}			
			response.end();
		});
	} else {
		request.flash('error',"Entrer nom et mdp svp");
		response.redirect('/');
	}
});

// Post register data
app.post('/register', (request, res, next) => {

	var users={
		"nom":request.body.nom,
		"email":request.body.email,
		"mdp":request.body.mdp
	}


		datab.query('INSERT INTO mydb.User SET ?', users, function(error, results, fields) {
			console.log(results);
			if (error) {
				res.json({
					status:false,
					message:'Error query et database'
				})
			  }else{
				request.flash('success',"GG tu est inscrit :)")  
				res.redirect('/');

			  }

		});

		
	});
	//LOGOUT
	app.get('/logout', (req, res, next) => {
		if(req.session.loggedin) {
			req.session.destroy(function() {
				res.redirect('/');
			});
		}
	});


	var obj = {};
app.get('/acceuil', function(request, response) {
	
	if (request.session.loggedin) {
		obj = {print:request.session.nom}
		response.render('./acceuil', {opp:request.session.opp, name:request.session.email, obja:obj});
	
	} else {
		request.flash('error',"Login toi pour voir la pages");
		response.redirect('/');
	}
	response.end();
});

app.get('/register', function (req, res) {  
  res.render( 'register' );  
});



app.listen(3333, () => {
    console.log('ća marche')
});
var fs = require('fs')
var jwt = require('jsonwebtoken')

function mocklogin() {
    const payload = {
        /*
         * Even if this is an unauthenticated user, add a userID in the sub claim that can be used
         * for billing purposes.
         * This ID will help us keep track "unique users". For unauthenticated users, drop a
         * cookie in the browser so you can make sure the user is counted uniquely across visits.
         */
        sub: 'sub', // Required
        iss: 'iss' // Required
    };
    // The "expiresIn" option adds an "exp" claim to the payload.
    var privateKey = fs.readFileSync('key/key.pem', {encoding:'utf-8'});
	var token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '2d'});
	console.log('Generated JWT:')
	console.log(token)
	return token
	}

jwt = mocklogin()

var bodyparser = require('body-parser');
var express = require('express');
var app = express();


app.use(express.static(__dirname + '/'));
app.use(bodyparser.urlencoded({extended:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.set('views', __dirname);

app.get('/flower', function(req, res) {
	console.log('life is a beautiful flower')
	res.render('index.html', {jwt:jwt});
});

app.listen(8000)

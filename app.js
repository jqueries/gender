var express = require('express.io');
var app = express().http().io();

// all environments
app.configure(function(){
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use("/stylesheets", express.static(__dirname + '/public/stylesheets'));
	app.use("/javascripts", express.static(__dirname + '/public/javascripts'));
	app.use(express.session({secret: 'oliver'}));
	app.set('view engine', 'ejs');
});

var routes = require('./routes')(app);

app.io.route('cast vote', function(req) {
	var total = req.data.count.male + req.data.count.female;
	var data = {
		"male": req.data.count.male / total * 100,
		"female": req.data.count.female / total * 100
	}
	console.log(data);
	// if(req.data.vote == "male"){
	// 	data["male"]++;
	// }

	// if(req.data.vote == "female"){
	// 	data["female"]++;
	// }

    app.io.broadcast('result', {'votes': data, 'total': total});
});


app.listen(6789);
console.log('\n\n\nExpress server listening on port 6789');

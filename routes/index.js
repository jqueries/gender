module.exports = function Route(app){

	app.get('/', function(req, res){
		res.render('index', {title:'Welcome Page'});
	});

}
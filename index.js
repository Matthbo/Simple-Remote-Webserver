(function(){
	const path = require('path').normalize(process.argv[2]),
		express = require('express'),
		port = 8000,
		app = express();

	app.static(path);
	app.listen(port);

	app.use(express.static(path));

	console.log(process.argv[2], '|', path);
})();
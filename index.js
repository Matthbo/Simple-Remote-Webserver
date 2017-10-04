(function(){
	const path = require('path').normalize(process.cwd()+"/"+(process.argv[2] || "")),
		express = require('express'),
		port = 8000,
		app = express();

	app.use(express.static(path));
	var server = app.listen(port, () => {
		console.log('> Started server in', path, 'and on localhost:' + port);
	});

	process.stdin.addListener("data", function(d) {
		cmd = d.toString().trim();

	    if(cmd === 'stop') {
	    	console.log('> Stopping server when clients are disconnected.');
	    	server.close(() => {
	    		console.log('> Server stopped.');
	    		process.exit(0);
	    	});
	    } else if(cmd === 'kill') {
	    	process.exit(0);
	    }else {
	    	console.log('> Command', '"'+cmd+'"', 'does not exist.\n  Available commands: stop.');
	    }
	});
})();
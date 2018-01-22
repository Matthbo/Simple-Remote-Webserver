(function(){
	const path = require('path'),
		fs = require('fs'),
		{ spawn, execSync } = require('child_process'),
		currentPath = path.normalize(process.cwd()+"/"+(process.argv[2] || "")),
		express = require('express'),
		port = 8000,
		app = express(),
		php = checkPHP();
	let cp_php;

	if(php){
		cp_php = spawn('php', ['-S', 'localhost:' + port]);
		console.log('> Started php server in', currentPath, 'and on localhost:' + port);
	} else {
		app.use(express.static(currentPath));
		var server = app.listen(port, () => {
			console.log('> Started server in', currentPath, 'and on localhost:' + port);
		});
	}

	process.stdin.addListener("data", function(d) {
		cmd = d.toString().trim();

	    if(cmd === 'stop') {
	    	if(php){
	    		console.log('> Stopping php server.');
	    		cp_php.kill();
	    		process.exit(0);
	    	} else {
		    	console.log('> Stopping server when clients are disconnected.');
		    	server.close(() => {
		    		console.log('> Server stopped.');
		    		process.exit(0);
		    	});
		    }
	    } else if(cmd === 'kill') {
		    		process.exit(0);
	    }else {
	    	console.log('> Command', '"'+cmd+'"', 'does not exist.\n  Available commands: stop, kill.');
	    }
	});

	function checkPHP(){
		var installed,
			pathHasPhp = false;

		try{
			execSync('php -v', { stdio: [] });
			installed = true;
		} catch (error) {
			installed = false;
		}

		files = fs.readdirSync(currentPath);
		for(i in files){
			if(files[i].indexOf('.php') >= 0) pathHasPhp = true;
		}

		return installed && pathHasPhp;
	}
})();
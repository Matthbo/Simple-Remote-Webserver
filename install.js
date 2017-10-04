(function(){
	var fs = require('fs'),
			cwd = process.cwd(),
			normalize = require('path').normalize;
			srwsDir = __dirname,
			scriptFile = normalize("bin/srws");

	if(!cwd.includes(normalize('/node_modules/'), 8)){
		var winScript = '@echo off\r\n\r\nset cwd=%cd%\r\nset srwsDir="'+srwsDir+'"\r\n\r\ncd /d %srwsDir% && node index %*\r\ncd /d %cwd%\r\n\r\nset cwd=\r\nset srwsDir=\r\n',
			linScript = '( cd "'+srwsDir+'" && node index $* )\n';

		fs.writeFile(scriptFile + '.bat', winScript, (err) => {
			if(err) throw err;
			console.log('Successfully created batch file');
		});
		fs.writeFile(scriptFile, linScript, (err) => {
			if(err) throw err;
			console.log('Successfully created shell file');
		});
	}
})();
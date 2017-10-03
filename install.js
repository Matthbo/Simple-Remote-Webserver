(function(){
	var fs = require('fs'),
		srwsDir = __dirname,
		scriptFile = ".\\script\\srws";

	var winScript = '@echo off\r\n\r\nset cwd=%cd%\r\nset srwsDir="'+srwsDir+'"\r\n\r\ncd /d %srwsDir% && node index %cwd%\\%*\r\ncd /d %cwd%\r\n\r\nset cwd=\r\nset srwsDir=\r\n',
		linScript = 'function srws() {\r\n\tcurDir=$(pwd)\r\n\t( cd "'+srwsDir+'" && node index $curDir/$* )\r\n}\r\n';

	fs.mkdir('.\\script', () => {
		fs.writeFile(scriptFile + '.bat', winScript, (err) => {
			if(err) throw err;
			console.log('Successfully created bat file');
		});
		fs.writeFile(scriptFile + '.sh', linScript, (err) => {
			if(err) throw err;
			console.log('Successfully created sh file');
		});
	});
})();
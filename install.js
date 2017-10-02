(function(){
	var fs = require('fs'),
		srwsDir = __dirname,
		scriptFile = ".\\script\\srws";

	var winScript =  `
@echo off\r\n
\r\n
set cwd=%cd%\r\n
set srwsDir="`+srwsDir+`"\r\n
\r\n
cd /d %srwsDir% && node index %*\r\n
cd /d %cwd%\r\n
\r\n
set cwd=\r\n
set srwsDir=\r\n`,
		linScript = `
function homestead() {\r\n
    ( cd "`+srwsDir+`" && node index $* )\r\n
}\r\n`;

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
(function(){
	const cwd = process.cwd();
	console.log(">>", cwd);
	if(!cwd.includes('/node_modules/', 8)){
		var fs = require('fs'),
			normalize = require('path').normalize;
			srwsDir = __dirname,
			scriptFile = normalize("bin/srws");

		var winScript = '@echo off\r\n\r\nset cwd=%cd%\r\nset srwsDir="'+srwsDir+'"\r\n\r\ncd /d %srwsDir% && node index %cwd%\\%*\r\ncd /d %cwd%\r\n\r\nset cwd=\r\nset srwsDir=\r\n',
			linScript = '( cd "'+srwsDir+'" && node index $(pwd)/$* )\n';

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
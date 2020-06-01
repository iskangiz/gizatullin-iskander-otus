const fs = require('fs');
const { resolve } = require('path');

let path = process.argv.slice(2)[0];
if(path === undefined) {
	path = './';
}

function getFilesTree(path) {
	fs.readdir(path, {withFileTypes: true}, (err, files) => {
		if (files == null)
			return;
		for (const file of files) {
			if (file.isDirectory()) {
				const combinedPath = resolve(path, file.name);
				getFilesTree(combinedPath)
			} else {
				console.log(resolve(path, file.name));
			}
		}
	});
}

getFilesTree(path);

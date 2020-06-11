const fs = require('fs');
const { resolve } = require('path');
const { readdir } = require('fs').promises;

let path = process.argv.slice(2)[0];
if(path === undefined) {
	path = './';
}

async function getFilesTree(path) {
	let result = {files: [], dirs: []};

	const files = await readdir(path, { withFileTypes: true });

	for (const file of files) {
		if (file.isDirectory()) {
			const combinedPath = resolve(path, file.name);
			result.dirs.push(await getFilesTree(combinedPath));
		} else {
			result.files.push(resolve(path, file.name));
		}
	}

	return result;
}


(async () => {
	console.log(JSON.stringify( await getFilesTree(path)));
})();

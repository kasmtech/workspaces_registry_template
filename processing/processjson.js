const fs = require("fs");
const glob = require("glob");
const { hashElement } = require("folder-hash");
const nextConfig = require("../site/next.config.js")

var dir = "./public";

if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}
if (!fs.existsSync(dir + "/icons")) {
	fs.mkdirSync(dir + "/icons");
}

glob("**/app.json", async function (err, files) {
	if (err) {
		console.log(
			"cannot read the folder, something goes wrong with glob",
			err
		);
	}

	let apptotal = files.length;
	let apps = [];
	let promises = [];

	const options = {
		algho: "sha1",
		encoding: "hex",
	};

	for (const file of files) {
		//files.forEach(async function(file) {

		let folder = file.replace("/app.json", "");

		let hash = await hashElement(folder, options);
		let filedata = fs.readFileSync(file);

		let parsed = JSON.parse(filedata);
		parsed.sha = hash.hash;
		console.log(parsed.name + ' added')
		apps.push(parsed);

		if (fs.existsSync(folder + "/" + parsed.image_src)) {
			let imagedata = fs.readFileSync(folder + "/" + parsed.image_src);
			fs.writeFileSync(dir + "/icons/" + parsed.image_src, imagedata);
		} else {
			console.error("missing file: ".folder + "/" + parsed.image_src);
		}

	}

	let json = {
		name: nextConfig.env.name || 'Unknown store',
		appcount: apptotal,
		schema_version: nextConfig.env.schema || '1.0',
		icon: nextConfig.env.icon || null,
		description: nextConfig.env.description || null,
		list_url: nextConfig.env.listUrl || null,
		contact_url: nextConfig.env.contactUrl || null,
		modified: Date.now(),
		apps: apps,
	};

	let data = JSON.stringify(json);

	fs.writeFileSync(dir + "/list.json", data);
});

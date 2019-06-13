const fs = require('fs');
var pkgFile;
var element = '.page-footer'; // change this

fs.readFile('./package.json', 'utf8', function(err, data) {
	if (err) throw err;
	pkgFile = JSON.parse(data);

	var content = `window.addEventListener('load',addVersion);
function addVersion() {
  var footer = document.querySelector("${element}");
  footer.insertAdjacentHTML('afterend', "<p id='version' style='position:fixed; bottom:0;left:0;background-color: yellow;'>v${pkgFile.version}</p>");
}
  `;

	fs.writeFile('./src/js/version/_version.js', content, function(err) {
		if (err) throw err;
		console.log(`Latest version: ${pkgFile.version}`);
	});
});

var OFFSET1 = 93;
var OFFSET2 = 54;
var OFFSET3 = 2;

var EXTRA_DOT = 57;


var fs = require('fs');

var content = fs.readFileSync("script.txt");
content = content.toString();
var result = "";
for(var i = 0; i < content.length; i++) {
	var code = content.charCodeAt(i);
	if(code >= 65 && code <= 90) {
		// A-Z
		result += content[i].toLowerCase();
	}
	else if(code >= 97 && code <= 122) {
		result += content[i];
	}
}

var subdomain = result.substring(0, OFFSET1);
subdomain = subdomain.substring(0, EXTRA_DOT)+"."+subdomain.substring(EXTRA_DOT);
var domain = result.substring(OFFSET1, OFFSET1+OFFSET2);
var tld = result.substring(OFFSET1+OFFSET2, OFFSET1+OFFSET2+OFFSET3);

var path = result.substring(OFFSET1+OFFSET2+OFFSET3);

var host = subdomain+"."+domain+"."+tld;
//var host = "localhost:2333";

console.log(host);
var http = require('http');
http.createServer(function(req, res) {
	console.log(req.url);
	if(req.url == "/"+path) {
		res.writeHead(200, {"Content-type": "text/plain"});
		res.write(content);
		res.end();
	}
	else {
		res.writeHead(301, {"Content-type": "text/plain", "Location": "https://"+host+"/"+path});
		res.write("Redirecting...");
		res.end();
	}
}).listen(process.env.PORT || 2333);

express = require('express')
bodyParser = require('body-parser')

app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req, res) {
	res.send('<form method="POST"><input name="name" placeholder="Type your name and press return." style="width:100%"/></form>')
})

app.post('/', function (req, res) {
	res.send('<h1>Hello ' + req.body.name + '</h1>')
})

app.get('/security', function (req, res) {
	// Add urls you want to test here

	var urls = {
		'Main': 'http://localhost:3000/'
	}

	// Add requests you want to test here

	var requests = {
		'Post Name': 'POST http://localhost:3000/ HTTP/1.1\r\nContent-Type: application/x-www-form-urlencoded\r\n\r\nname=Bob'
	}

	// The actual page to render

	var page = []

	// Build urls to test

	page.push('<h1>URLs</h1>')
	page.push('<ul>')
	for (var key in urls) {
		var url = urls[key]
		url = 'http://secapps.com/apps/scanner/#target=' + encodeURIComponent(url)
		page.push('<li><a target="_blank" href="' + url + '">' + key + '</a></li>')
	}
	page.push('</ul>')

	// Build requests to test

	page.push('<h1>Requests</h1>')
	page.push('<ul>')
	for (var key in requests) {
		var request = requests[key]
		request = 'http://secapps.com/apps/retest/#request=' + encodeURIComponent(request)
		page.push('<li><a target="_blank" href="' + request + '">' + key + '</a></li>')
	}
	page.push('</ul>')

	// Render the page

	res.send(page.join(''))
})

server = app.listen(3000, function () {
	console.log('listening on ' + server.address().port)
})

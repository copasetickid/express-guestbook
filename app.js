var http = require('http'),
    path = require('path'),
    express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

var app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view enginer', 'ejs');

var entries = []; //Global array to store all entries
app.locals.entries = entries;

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", function(request, response) {
  response.render('index');
});

app.get("/new-entry", function(request, response) {
  response.render('new-entry');
});

app.post('new-entry', function(request, response) {
  if(!request.body.title || !request.body.body) {
    response.status(400).send('Entries must have a title and a body.');
  }

  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });

  response.redirect('/');
});

app.use(function(request, response) {
  response.status(404).render('404');
});

http.createServer(app).listen(3000, function() {
  console.log("Guestbook app started on port 3000");
});

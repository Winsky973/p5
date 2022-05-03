app.get('/', function(req, res) {
    res.sendFile(__dirname + '/front/html/index.html');
});
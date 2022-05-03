const express = require('express');
const path = require('path');

const productRoutes = require('./routes/product');

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));


app.get('/', function(req, res) {
    app.use('/public', express.static(path.join(__dirname, '..', '../front')));
    res.sendFile(path.join(__dirname, '..', 'front/', 'html/index.html'));
    console.log(__dirname + '..' + '/front/' + 'html/index.html');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRoutes);

module.exports = app;
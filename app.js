const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin').routes;
const shopRoutes = require('./routes/shop');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: '404 Page not found', layout: false});
});

app.listen(3000);

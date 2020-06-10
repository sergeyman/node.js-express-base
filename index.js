const express = require('express');
const booksRouter = express.Router(); //express-router

const app = express(); //it's working

const products = ['Apple', 'Pen', 'Computer', 'Cherry'];

app.set('view engine', 'pug'); // turn on pug
//app.set('view engine', 'ejs');							// turn on EJS
app.set('views', './views');


//MW 
app.use((req, res, next) => {
    console.log('Date: ', new Date(), 'Method: ', req.method, 'URL: ', req.originalUrl, 'IP: ', req.ip);
    next();
});

//express.static('public');							//dir for static files
app.use('/static', express.static(__dirname + '/public')); //отображать стат. файлы в /public

//routes
app.get('/', (req, res, next) => {
    res.send('It\'s working');
});

app.get('/products', (req, res, next) => {
    console.log('Page ', req.query.page); //query-strings-парамтры в адресной строке ...?page=0
    //next();											//MW function
    //res.send(products);
    res.json({ products }); //Responce Headers: Content-Type: application/json; charset=utf-8
});

app.get('/products/:id', (req, res, next) => {
    if (products[req.params.id]) {
        res.send(products[req.params.id]);
    } else {
        res.status(404).send('Product not found'); //Set status code
    }
});

app.get('/things/:name/:id', function(req, res) {
    res.send('Id: ' + req.params.id + ' and Name: ' + req.params.name);
});


app.get('/ukr', (req, res, next) => { //Redirect to another site
    res.redirect('https://www.ukr.net/');
})

app.get('/redirect', (req, res, next) => { //Redirect to existing route
        res.redirect(302, '/');
    })
    //302 - temp change place
    //301 - const change place

//templating pug
app.get('/pug', (req, res, next) => {
    res.render('main', { //pass value (object) to templates
        title: 'Products',
        message: 'Products List',
        products: products,
        name: 'Sergei'
    });
});

//templating EJS
app.get('/ejs', (req, res, next) => {
    res.render('ejs', { //pass value (object) to templates
        title: 'Products',
        message: 'Products List',
        products: products,
        name: 'Sergei'
    });
});

app.get('/downloadBooks', (req, res, next) => {
    res.download('./public/books.html' /*custom_file_name, cb_to_find_out_on_pass_file_to */ );
    console.log('File sent');
})

booksRouter.get('/', (req, res) => {
    res.send('Books');
});

booksRouter.get('/about', (req, res) => {
    res.send('About Books');
});

app.use('/books', booksRouter); // Base route

//Error handling with MW
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(err, stack);
})

app.listen(5000, () => {
    console.log('It\'s started', new Date());
});


//to start the server:
//>node index.js
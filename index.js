const express = require('express');
const booksRouter = express.Router();				//express-router

const app = express();		//it's working

const products = ['Apple', 'Pen', 'Computer', 'Cherry'];

app.get('/', (req, res, next) => {
	res.send('It\'s working');
});

app.get('/products', (req, res, next)=>{
	console.log('Page ', req.query.page);			//query-strings-парамтры в адресной строке ...?page=0
	
	res.send(products);
	//res.json({products});							//Responce Headers: Content-Type: application/json; charset=utf-8
});

app.get('/products/:id', (req, res, next)=>{
	if(products[req.params.id]) {
		res.send(products[req.params.id]);
	}
	else {
		res.status(404).send('Product not found');	//Set status code
	}
});

app.get('/ukr', (req, res, next) => {				//Redirect to another site
	res.redirect('https://www.ukr.net/');
})

app.get('/redirect', (req, res, next) => {			//Redirect to existing route
	res.redirect(302, '/');
})

//302 - temp change place
//301 - const change place

booksRouter.get('/', (req, res) => {
	res.send('Books');
});

booksRouter.get('/about', (req, res) => {
	res.send('About Books');
});

app.use('/books', booksRouter);						// Base route


app.listen(5000, ()=> {
	console.log('It\'s started', new Date());
});


//to start the server:
//>node index.js
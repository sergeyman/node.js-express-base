const express = require('express');

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

app.listen(5000, ()=> {
	console.log('It\'s started', new Date());
});


//to start the server:
//>node index.js
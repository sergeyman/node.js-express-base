const express = require('express');

const app = express();		//it's working

const products = ['Apple', 'Pen', 'Computer', 'Cherry'];

app.get('/', (req, res, next) => {
	res.send('It\'s working');
});

app.get('/products', (req, res, next)=>{
	res.send(products);
});
app.get('/products', (req, res, next)=>{
	res.send(1);
});

app.listen(5000, ()=> {
	console.log('It\'s started');
});


//to start the server:
//>node index.js
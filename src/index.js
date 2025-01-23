import express from 'express';
import { getItems, addItem, getItemById } from './items.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Static HTML-page in the server root
app.use('/', express.static('public'));

//Middleware that reads json data from POST request body
app.use(express.json());

//REST-apis under /api/-route
app.get('/api', (req, res) => {
  console.log('get-pyyntö juureen');
  //res.send('Welcome to my REST API!');
  res.json({message: 'Hi again'});
});

// Items resource endpoints
app.get('/api/items', getItems);
app.get('/api/items/:id', getItemById);
app.post('/api/items', addItem);

//Route params
app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log(req.params);
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);
  // Testing if both numbers are numbers
  // If not, send status code message
  if(isNaN(num1) || isNaN(num2)) {
    res.status(400);
    res.json({error: 'Both parameters must be numbers'
    });
    return;
  }
  res.json({sum: num1 + num2});
});

//Query params
app.get('/api/sum/', (req, res) => {
  console.log(req.query);
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  res.json({sum: num1 + num2});
});

//POST body request and reading data
app.post('/api/greet', (req, res) => {
  console.log(req.body);
  res.status(200);
  res.json({reply: 'well howdy ' + req.body.sender});
});

//TODO add own route and functionality
//Count square  number of the given number
//Error message if the given parameter is not a number
app.get('/api/square/:nom', (req, res) => {
  console.log(req.params);
  const nom = Number(req.params.nom);
  if(isNaN(nom)) {
    res.status(400);
    res.json({error: 'Please give a number'
    });
    return;
  }
  res.json({square: nom ** 2});
})


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

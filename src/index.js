import express from 'express';
import cors from 'cors';
import {addItem, deleteItem, editItem, getItemById, getItems} from './items.js';

import userRouter from './routes/user-router.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// To use with Vite(frontend)
app.use(cors());

// Static HTML-page in the serever root
app.use('/', express.static('public'));
// Middleware that reads json data from POST-requests body
app.use(express.json());
// Resources for REST API under api-path
app.get('/api/', (req, res) => {
  console.log('get-pyyntö apin juureen havaittu');
  console.log(req.url);
  res.send('Welcome to my REST API!');
});


// Endpoints for Users resources
app.use('/api/users', userRouter);

// Endponts for Items resources (test)
app.get('/api/items', getItems);
app.get('/api/items/:id', getItemById);
app.post('/api/items', addItem);
app.put('/api/items/:id', editItem);
app.delete('/api/items/:id', deleteItem);



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

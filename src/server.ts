import express from 'express';
import routes from './routes';

import cors from 'cors';

const app = express();

app.use(cors);
app.use(express.json());
app.use(routes);

// app.get('/users', (req, res) => {
//   const user = [
//     { name: 'Name 1', age: 42 },
//     { name: 'Name 2', age: 32 },
//   ]
//   return res.send(user);
// });

// app.post('/users', (req, res) => {
//   const user = req.body;

//   return res.send(user);
// });

// app.delete('/users/:id', (req, res) => {
//   const user = req.params;
    
//   return res.send(user);
// });

app.listen(3333);
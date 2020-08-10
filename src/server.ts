import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ok: true});
})

// app.get('/users', (req, res) => {
//   const user = [
//     { name: 'Eduardo', age: 42 },
//     { name: 'Mellina', age: 32 },
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
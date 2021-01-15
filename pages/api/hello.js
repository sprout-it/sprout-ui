import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Test Success')
})

export default test(app)

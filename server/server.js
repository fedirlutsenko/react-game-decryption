const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const app = express();
const port = process.env.PORT || 5000;
var MemoryStorage = require('memorystorage');
var store = MemoryStorage('my-store');

const { getNewPassword } = require ("../server/src/Utils/passwordUtils")

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: false
})); // support encoded bodies
app.use('/', router);

app.get('/', (req, res) => {
  res.send('Server Is up!');
});

app.get('/api/test', async (req, res) => {
  res.send('HIT');
});

app.get('/api/new-password', async (req, res) => {
  const newPassword = getNewPassword();
  store.setItem('password', newPassword);
  res.json({
    hint: newPassword,
  });
});

app.post('/api/world/', async (req, res) => {
  try {
    res.json({
      success: true,
      result: `I received your POST request. This is what you sent me: ${req.body.post}`,
    });
  } catch (error) {

  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;
const MemoryStorage = require('memorystorage');
const MemoryStore = MemoryStorage('my-store');

const {
  getNewPassword,
  reversePassword,
  isPasswordCorrect,
  getHighlightedIndexes,
} = require("../server/src/Utils/passwordUtils")

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: false})); // support encoded bodies
app.use('/', router);

app.get('/', (req, res) => {
  res.send('Server Is up!');
});

app.get('/api/new-password', async (req, res) => {
  try {
    const newPassword = getNewPassword();
    MemoryStore.setItem('password', newPassword);
    console.log("New password created:  ", MemoryStore.getItem("password"));

    const reversedPassword = reversePassword(newPassword);
    MemoryStore.setItem('hint', reversedPassword);
    console.log("New hint created:      ", MemoryStore.getItem("hint"));

    res.json({
      hint: MemoryStore.getItem("hint"),
    });

  } catch (e) {
    Console.error("Couldn't create new password" + e)
  }
});

app.post('/api/verify-password', async (req, res) => {
  try{
    res.json({
      correct: isPasswordCorrect(MemoryStore.getItem("password"), req.body.answer),
      highlight: getHighlightedIndexes(MemoryStore.getItem("password"), req.body.answer),
      hint: MemoryStore.getItem("hint"),
      answer: req.body.answer,
    });
  } catch (e) {
      console.error("Couldn't verify password" + e)
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
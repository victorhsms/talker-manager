const express = require('express');
const bodyParser = require('body-parser');
const cryptoJs = require('crypto');
const {
  validationsLogin,
  authenticated, 
} = require('./middlewares/index');

const app = express();
app.use(bodyParser.json());

const { readJson, writeJson } = require('./utils/index');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (request, response) => {
  const json = await JSON.parse(readJson());
  response.status(200).json(json);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;

  const talkers = await JSON.parse(readJson());
  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  if (talkerIndex === -1) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 

  response.status(200).json(talkers[talkerIndex]);
});

app.post('/login', validationsLogin, (request, response) => {
  // aprendi a fazer isso pelo site: https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
  const hash = cryptoJs.randomBytes(8).toString('hex');
  
  response.status(200).json({ token: hash });
});

app.post('/talker', authenticated, async (request, response) => {
  response.status(201);
});

app.delete('/talker/:id', authenticated, async (request, response) => {
  const { id } = request.params;

  const talkers = await JSON.parse(readJson());
  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  console.log(talkerIndex);
  talkers.splice(talkerIndex, 1);
  console.log(talkers);
  writeJson(JSON.stringify(talkers));
  response.status(204).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

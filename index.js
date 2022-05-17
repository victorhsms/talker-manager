const express = require('express');
const bodyParser = require('body-parser');
const cryptoJs = require('crypto');
const {
  validationsLogin,
  authenticated, 
  error,
  validateName,
  validateAge,
  validateTalker,
  validateRateAndWatched,
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
  return response.status(200).json(json);
});

app.get('/talker/search', authenticated, async (request, response) => {
  const { q } = request.query;

  const talkers = await JSON.parse(readJson());
  if (!q) return response.status(200).json(talkers);

  const talkerTarget = talkers.filter((talker) => talker.name.includes(q));

  return response.status(200).json(talkerTarget);
}); 

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;

  const talkers = await JSON.parse(readJson());
  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  if (talkerIndex === -1) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 

  return response.status(200).json(talkers[talkerIndex]);
});

app.post('/login', validationsLogin, (request, response) => {
  // aprendi a fazer isso pelo site: https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
  const hash = cryptoJs.randomBytes(8).toString('hex');
  
  return response.status(200).json({ token: hash });
});

app.post(
  '/talker',
  authenticated,
  validateName,
  validateAge,
  validateTalker,
  validateRateAndWatched,
  async (request, response) => {
  const { body: talker } = request;
  
  const talkers = await JSON.parse(readJson());
  const newTalker = {
    id: talkers[talkers.length - 1].id + 1,
    ...talker,
  };
  talkers.push(newTalker);
  writeJson(JSON.stringify(talkers));
  return response.status(201).json(newTalker);
},
);

app.put(
  '/talker/:id',
  authenticated,
  validateName,
  validateAge,
  validateTalker,
  validateRateAndWatched,
  async (request, response) => {
  const { body } = request;
  const { id } = request.params;
  const talkers = await JSON.parse(readJson());
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  const newTalker = { id: talkerIndex + 1, ...body };
  talkers.splice(talkerIndex, 1, newTalker);
  writeJson(JSON.stringify(talkers));
  return response.status(200).json(newTalker);
},
);

app.delete('/talker/:id', authenticated, async (request, response) => {
  const { id } = request.params;

  const talkers = await JSON.parse(readJson());
  const talkerIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  talkers.splice(talkerIndex, 1);
  writeJson(JSON.stringify(talkers));
  return response.status(204).send();
});

app.use(error);

app.listen(PORT, () => {
  console.log('Online');
});

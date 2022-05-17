const fs = require('fs/promises');
// conteúdo aprendido pelo vídeo https://www.youtube.com/watch?v=w30zWauuoGw do canal Emerson Broga
// readFileSync: https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_readfilesync_path_options

const readJson = async () => {
  const json = await fs.readFile('./talker.json', 'utf-8', (error, data) => data);
  return JSON.parse(json);
};
  
const writeJson = async (data) => {
  await fs.writeFile('./talker.json', data);
};

module.exports = { readJson, writeJson };

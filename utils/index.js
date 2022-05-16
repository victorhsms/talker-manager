const fs = require('fs');
// conteúdo aprendido pelo vídeo https://www.youtube.com/watch?v=w30zWauuoGw do canal Emerson Broga
// readFileSync: https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_readfilesync_path_options

const readJson = () => fs.readFileSync('./talker.json', 'utf-8', (error, data) => data);

module.exports = { readJson };

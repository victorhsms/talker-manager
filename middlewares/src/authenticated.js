module.exports = (require, response, next) => {
  const { authorization } = require.headers;
  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });

  // Regex que aceita apenas 16 caractes, variando entre letras e números
  const regex = /(?=.*[a-z])(?=.*\d)[a-z0-9]{16}/;
  if (!(regex.test(authorization.toString())) || authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  return next();
};

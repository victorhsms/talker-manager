module.exports = (require, response, next) => {
  const { headers: { authorization } } = require;

  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });

  // Regex que aceita apenas 16 caractes, variando entre letras e números
  const regex = /(?=.*[a-z])(?=.*\d)[a-z0-9]{16}/;
  if (!(regex.test(authorization.toString()))) {
    response.status(401).json({ message: 'Token inválido' });
  }
  next();
};

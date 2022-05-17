module.exports = (request, response, next) => {
  const { email, password } = request.body;

  if (!email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });

  // Regex que pede um formato 'multiplos caracteres' + '@caracteres(incluindo . e -)' + '.2caracteres(ou mais)', além das flags i, g e m
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
  if (!(emailRegex.test(email))) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return response.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

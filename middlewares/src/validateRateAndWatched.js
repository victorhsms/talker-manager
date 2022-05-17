module.exports = (request, response, next) => {
  const { talk: { watchedAt, rate } } = request.body;

  // regex pra o formato dd/mm/yyyy que aceita 00-31/00-12/0000-9999
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!regexDate.test(watchedAt)) {
    return response.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  if (Number(rate) < 1 || Number(rate) > 5) {
    return response.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  return next();
};

module.exports = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};
module.exports = (error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message });
  console.log(error.message);
  next();
};

const validationsLogin = require('./src/validationsLogin');
const authenticated = require('./src/authenticated');
const error = require('./src/error');
const validateName = require('./src/validateName');
const validateAge = require('./src/validateAge');
const validateTalker = require('./src/validateTalker');
const validateRateAndWatched = require('./src/validateRateAndWatched');

module.exports = {
  validationsLogin,
  authenticated,
  error,
  validateName,
  validateAge,
  validateTalker,
  validateRateAndWatched,
};
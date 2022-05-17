const validationsLogin = require('./src/validationsLogin');
const authenticated = require('./src/authenticated');
const validateName = require('./src/validateName');
const validateAge = require('./src/validateAge');
const validateTalker = require('./src/validateTalker');
const validateRateAndWatched = require('./src/validateRateAndWatched');

module.exports = {
  validationsLogin,
  authenticated,
  validateName,
  validateAge,
  validateTalker,
  validateRateAndWatched,
};

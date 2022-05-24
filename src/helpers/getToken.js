const conf = require('./conf');

module.exports = () => {
  return conf.get('token');
};

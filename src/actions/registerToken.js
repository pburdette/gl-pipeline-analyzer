const conf = require('../helpers/conf');
const chalk = require('chalk');

module.exports = (token) => {
  const output = chalk.green(
    `🎉 You have successfully registered your personal access token ${token}`
  );

  conf.set('token', token);

  console.log(output);

  return output;
};

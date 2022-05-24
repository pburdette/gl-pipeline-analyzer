const conf = require('../helpers/conf');
const chalk = require('chalk');

module.exports = (token) => {
  conf.set('token', token);

  console.log(
    chalk.green(
      `🎉 You have successfully registered your personal access token ${token}`
    )
  );
};

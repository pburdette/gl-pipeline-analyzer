const chalk = require('chalk');
const getToken = require('./getToken');
const getProject = require('./getProject');

module.exports = () => {
  if (!getToken() || !getProject()) {
    console.log(
      chalk.yellow(
        'Please make sure you have registered your personal access token and project before using this tool.'
      )
    );

    return false;
  }

  return true;
};

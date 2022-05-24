const chalk = require('chalk');
const conf = require('../helpers/conf');

module.exports = (project) => {
  conf.set('project', project);

  console.log(
    chalk.green(`🎉 You have successfully registered your project ${project}`)
  );
};

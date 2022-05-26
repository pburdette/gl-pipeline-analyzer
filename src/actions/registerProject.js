const chalk = require('chalk');
const conf = require('../helpers/conf');

module.exports = (project) => {
  const output = chalk.green(
    `🎉 You have successfully registered your project ${project}`
  );

  conf.set('project', project);

  console.log(output);

  return output;
};

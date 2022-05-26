const { getLatestPipelineIidData } = require('../helpers/api');
const apiSafeGuard = require('../helpers/apiSafeGuard');
const chalk = require('chalk');

module.exports = async () => {
  if (apiSafeGuard()) {
    let output;

    try {
      const {
        project: { pipelines },
      } = await getLatestPipelineIidData();

      if (pipelines.nodes.length > 0) {
        const iid = pipelines.nodes[0].iid;

        output = `✨ The latest pipeline iid is: ${chalk.green(iid)}`;
      } else {
        output = chalk.yellow(
          'It looks like you do not have any pipelines yet.'
        );
      }

      console.log(output);

      return output;
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
};

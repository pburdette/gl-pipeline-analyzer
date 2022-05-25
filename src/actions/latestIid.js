const { getLatestPipelineIidData } = require('../helpers/api');
const apiSafeGuard = require('../helpers/apiSafeGuard');
const chalk = require('chalk');

module.exports = async () => {
  if (apiSafeGuard()) {
    try {
      const {
        project: { pipelines },
      } = await getLatestPipelineIidData();

      if (pipelines.nodes.length > 0) {
        const iid = pipelines.nodes[0].iid;

        console.log(`✨ The latest pipeline iid is: ${chalk.green(iid)}`);
      } else {
        console.log(
          chalk.yellow('It looks like you do not have any pipelines yet.')
        );
      }
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
};

const { getPipelineDetailsData } = require('../helpers/api');
const apiSafeGuard = require('../helpers/apiSafeGuard');
const chalk = require('chalk');

module.exports = async (pipelineIid) => {
  if (apiSafeGuard()) {
    try {
      const {
        project: { pipeline },
      } = await getPipelineDetailsData(pipelineIid);

      if (pipeline.complete) {
        console.log(`
        Pipeline iid: ${chalk.green(pipeline.iid)}
        Ran for ${chalk.yellow(pipeline.duration)} seconds
        Was queued for ${chalk.yellow(
          pipeline.queuedDuration
        )} seconds before starting
        Has a status of "${pipeline.status}"
      `);
      } else {
        console.log(`
        Pipeline iid: ${chalk.green(pipeline.iid)}
        Has a status of "${pipeline.status}"
      `);
      }
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
};

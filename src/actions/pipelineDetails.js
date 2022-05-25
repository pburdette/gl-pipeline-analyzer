const { getPipelineDetailsData } = require('../helpers/api');
const apiSafeGuard = require('../helpers/apiSafeGuard');
const chalk = require('chalk');

module.exports = async (pipelineIid) => {
  if (apiSafeGuard()) {
    let output;

    try {
      const {
        project: { pipeline },
      } = await getPipelineDetailsData(pipelineIid);

      if (pipeline.complete) {
        output = `
        Pipeline iid: ${chalk.green(pipeline.iid)}
        Ran for ${chalk.yellow(pipeline.duration)} seconds
        Was queued for ${chalk.yellow(
          pipeline.queuedDuration
        )} seconds before starting
        Has a status of ${pipeline.status}
      `;
      } else {
        output = `
        Pipeline iid: ${chalk.green(pipeline.iid)}
        Has a status of ${pipeline.status}
      `;
      }

      console.log(output);

      return output;
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
};

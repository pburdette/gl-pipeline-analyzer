const { getSlowJobsData } = require('../helpers/api');
const apiSafeGuard = require('../helpers/apiSafeGuard');
const chalk = require('chalk');

module.exports = async (pipelineIid) => {
  let limit = 10;

  if (apiSafeGuard()) {
    try {
      const {
        project: { pipeline },
      } = await getSlowJobsData(pipelineIid);

      const totalJobsLength = pipeline.jobs.nodes.length;

      if (totalJobsLength < limit) {
        limit = totalJobsLength;
      }

      const sortedByDuration = pipeline.jobs.nodes.sort((a, b) => {
        return b.duration - a.duration;
      });

      for (let i = 0; i < limit; i++) {
        const name = sortedByDuration[i]?.name;
        const duration = sortedByDuration[i]?.duration;

        console.log(
          `⏳ Job ${chalk.green(name)} took ${chalk.yellow(
            duration
          )} seconds to complete`
        );
      }
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
};

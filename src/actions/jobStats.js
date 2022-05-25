const { getJobsData } = require('../helpers/api');
const apiSafeGuard = require('../helpers/apiSafeGuard');
const {
  LIMIT,
  SORT_BY_DURATION,
  SORT_BY_QUEUED_DURATION,
} = require('../constants');
const chalk = require('chalk');

module.exports = async (pipelineIid, sortByType) => {
  let limit = LIMIT;

  if (apiSafeGuard()) {
    try {
      const {
        project: { pipeline },
      } = await getJobsData(pipelineIid);

      const totalJobsLength = pipeline.jobs.nodes.length;

      if (totalJobsLength < limit) {
        limit = totalJobsLength;
      }

      const sorted = pipeline.jobs.nodes.sort((a, b) => {
        if (sortByType === SORT_BY_DURATION) {
          return b.duration - a.duration;
        }

        if (sortByType === SORT_BY_QUEUED_DURATION) {
          return b.queuedDuration - a.queuedDuration;
        }
      });

      for (let i = 0; i < limit; i++) {
        let duration;

        const name = sorted[i]?.name;

        if (sortByType === SORT_BY_DURATION) {
          duration = sorted[i]?.duration;
        }

        if (sortByType === SORT_BY_QUEUED_DURATION) {
          duration = sorted[i]?.queuedDuration;
        }

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

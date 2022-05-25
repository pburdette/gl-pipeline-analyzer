const { getQueuedDurationJobsData } = require('../helpers/api');
const apiSafeGuard = require('../helpers/apiSafeGuard');
const { LIMIT } = require('../constants');
const chalk = require('chalk');

/*
  This action is VERY similar to the slowJobs action.
  For now we are keeping these actions seperate to reduce
  the complexity of the actions themselves (conditionals etc.).

  As well as to utilize a query that fetches just the data we need and no more.
  And to promote shipping this tool faster. We can come back to this later, it's
  def a candidate for a refactor in the future.
*/
module.exports = async (pipelineIid) => {
  let limit = LIMIT;

  if (apiSafeGuard()) {
    try {
      const {
        project: { pipeline },
      } = await getQueuedDurationJobsData(pipelineIid);

      const totalJobsLength = pipeline.jobs.nodes.length;

      if (totalJobsLength < limit) {
        limit = totalJobsLength;
      }

      const sortedByqueuedDuration = pipeline.jobs.nodes.sort((a, b) => {
        return b.queuedDuration - a.queuedDuration;
      });

      for (let i = 0; i < limit; i++) {
        const name = sortedByqueuedDuration[i]?.name;
        const queuedDuration = sortedByqueuedDuration[i]?.queuedDuration;

        console.log(
          `⏳ Job ${chalk.green(name)} waited for ${chalk.yellow(
            queuedDuration
          )} seconds to complete`
        );
      }
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
};

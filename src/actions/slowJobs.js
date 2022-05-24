const getPipelineData = require('../helpers/getPipelineData');
const apiSafeGuard = require('../helpers/apiSafeGuard');
const chalk = require('chalk');

const limit = 10;

module.exports = async (pipelineIid) => {
  if (apiSafeGuard()) {
    const {
      project: { pipeline },
    } = await getPipelineData(pipelineIid);

    const sortedByDuration = pipeline.jobs.nodes.sort((a, b) => {
      return b.duration - a.duration;
    });

    for (let i = 0; i < limit; i++) {
      const name = sortedByDuration[i].name;
      const duration = sortedByDuration[i].duration;

      console.log(
        `⏳ Job ${chalk.green(name)} took ${chalk.yellow(
          duration
        )} seconds to complete`
      );
    }
  }
};

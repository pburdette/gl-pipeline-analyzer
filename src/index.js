#!/usr/bin/env node

const { program } = require('commander');

const registerToken = require('./actions/registerToken');
const registerProject = require('./actions/registerProject');
const jobStats = require('./actions/jobStats');
const latestIid = require('./actions/latestIid');
const pipelineDetails = require('./actions/pipelineDetails');

const { SORT_BY_DURATION, SORT_BY_QUEUED_DURATION } = require('./constants');

program
  .name('gl-pipeline-analyzer')
  .description('CLI tool for analyzing GitLab pipelines');

program
  .command('register-token')
  .description('Register your GitLab personal access token')
  .argument('<access-token>', 'GitLab personal access token')
  .action(registerToken);

program
  .command('register-project')
  .description('Project path')
  .argument('<project-path>', 'Path of the project `pburdette/ci-project`')
  .action(registerProject);

program
  .command('slow-jobs')
  .description('Calculates the 10 slowest jobs in a pipeline')
  .argument('<pipeline-iid>', 'pipeline iid to analyze')
  .action((pipelineIid) => {
    jobStats(pipelineIid, SORT_BY_DURATION);
  });

program
  .command('queued-jobs')
  .description('Calculates 10 jobs that spent the longest time waiting')
  .argument('<pipeline-iid>', 'pipeline iid to analyze')
  .action((pipelineIid) => {
    jobStats(pipelineIid, SORT_BY_QUEUED_DURATION);
  });

program
  .command('latest-iid')
  .description('Find the latest pipeline iid')
  .action(latestIid);

program
  .command('pipeline-details')
  .description('Stats of the pipeline')
  .argument('<pipeline-iid>', 'pipeline iid to analyze')
  .action(pipelineDetails);

program.parse();

#!/usr/bin/env node

const { program } = require('commander');

const registerToken = require('./actions/registerToken');
const registerProject = require('./actions/registerProject');
const slowJobs = require('./actions/slowJobs');
const queuedJobs = require('./actions/queuedJobs');

program
  .name('gl-pipeline-analyzer')
  .description('CLI tool for analyzing GitLab pipelines')
  .version('1.0.0');

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
  .action(slowJobs);

program
  .command('queued-jobs')
  .description('Calculates 10 jobs that spent the longest time waiting')
  .argument('<pipeline-iid>', 'pipeline iid to analyze')
  .action(queuedJobs);

program.parse();

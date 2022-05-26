# gl-pipeline-analyzer

📈 A CLI tool to analyze GitLab Pipelines

## Highlights 🏆

All right from the command line you can 

- View the slowest jobs in your pipelines
- View the jobs that spent the longest time in `pending`
- View stats from a certain pipeline

More features coming soon...


## Installation

```bash
npm install gl-pipeline-analyzer
```

## Usage


### View all commands 

```bash
gl --help
```

### Register GitLab personal access token 

> You will need to run this command and register-project before using the API
> 
> This is stored locally on your machine with the package [conf](https://www.npmjs.com/package/conf) 

```bash
gl register-token <access-token>
```

### Register project

> You will need to run this command and register-token before using the API
> 
> Use this command to persist a certain project

```bash
gl regsiter-project <your-project-path>
```

### Return the latest pipelines iid

> So you don't have to search for the latest pipeline iid

```bash
gl latest-iid
```

### View slow jobs

> Returns the 10 slowest jobs in the pipeline

```bash
gl slow-jobs <pipeline-iid>
```

**Example output**

```bash
⏳ Job slow_job_one took 195 seconds to complete
⏳ Job slow_job_three took 166 seconds to complete
⏳ Job slow_job_two took 133 seconds to complete
⏳ Job fast_job_three took 57 seconds to complete
⏳ Job fast_job_two took 33 seconds to complete
⏳ Job fast_job_one took 21 seconds to complete
⏳ Job allow_failure_test_job took 14 seconds to complete
⏳ Job coverage_job took 12 seconds to complete
```

### View queued jobs

> Returns 10 jobs that spent the longest time queued

```bash
gl queued-jobs <pipeline-iid>
```

**Example output**

```bash
⏳ Job slow_job_two waited 0.4744 seconds in the pending state
⏳ Job fast_job_one waited 0.467092 seconds in the pending state
⏳ Job slow_job_three waited 0.455937 seconds in the pending state
⏳ Job fast_job_three waited 0.396569 seconds in the pending state
⏳ Job fast_job_two waited 0.388403 seconds in the pending state
⏳ Job coverage_job waited 0.359404 seconds in the pending state
⏳ Job slow_job_one waited 0.139841 seconds in the pending state
⏳ Job allow_failure_test_job waited 0.136156 seconds in the pending state
```

### View usueful pipeline stats

```bash
gl pipeline-details <pipeline-iid>
```

**Example output**

```bash
Pipeline iid: 1
Ran for 209 seconds
Was queued for 1 seconds before starting
Has a status of SUCCESS
```





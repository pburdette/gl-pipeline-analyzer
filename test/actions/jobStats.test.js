const nock = require('nock');
const jobStats = require('../../src/actions/jobStats');
const {
  SORT_BY_DURATION,
  SORT_BY_QUEUED_DURATION,
} = require('../../src/constants');

console.log = jest.fn();

jest.mock('chalk', () => ({
  green: jest.fn((str) => str),
  yellow: jest.fn((str) => str),
}));

jest.mock('../../src/helpers/apiSafeGuard', () =>
  jest.fn().mockReturnValue(true)
);

const jobNodes = [
  {
    name: 'test_job_one',
    duration: 1000,
    queuedDuration: 120,
  },
  {
    name: 'test_job_two',
    duration: 1200,
    queuedDuration: 10,
  },
  {
    name: 'test_job_three',
    duration: 500,
    queuedDuration: 100,
  },
];

describe('jobStats', () => {
  it('when sortByType is duration', async () => {
    nock('https://gitlab.com')
      .post('/api/graphql')
      .reply(200, {
        data: {
          project: {
            pipeline: {
              jobs: {
                nodes: jobNodes,
              },
            },
          },
        },
      });

    const output = await jobStats(1, SORT_BY_DURATION);
    const expectedOutput = [
      {
        name: 'test_job_two',
        duration: 1200,
        queuedDuration: 10,
      },
      {
        name: 'test_job_one',
        duration: 1000,
        queuedDuration: 120,
      },
      {
        name: 'test_job_three',
        duration: 500,
        queuedDuration: 100,
      },
    ];

    expect(output).toEqual(expectedOutput);
  });

  it('when sortByType is queuedDuration', async () => {
    nock('https://gitlab.com')
      .post('/api/graphql')
      .reply(200, {
        data: {
          project: {
            pipeline: {
              jobs: {
                nodes: jobNodes,
              },
            },
          },
        },
      });

    const output = await jobStats(1, SORT_BY_QUEUED_DURATION);
    const expectedOutput = [
      {
        name: 'test_job_one',
        duration: 1000,
        queuedDuration: 120,
      },
      {
        name: 'test_job_three',
        duration: 500,
        queuedDuration: 100,
      },
      {
        name: 'test_job_two',
        duration: 1200,
        queuedDuration: 10,
      },
    ];

    expect(output).toEqual(expectedOutput);
  });
});

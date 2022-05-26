const nock = require('nock');
const chalk = require('chalk');
const pipelineDetails = require('../../src/actions/pipelineDetails');

console.log = jest.fn();

jest.mock('chalk', () => ({
  green: jest.fn((str) => str),
  red: jest.fn((str) => str),
  yellow: jest.fn((str) => str),
}));

describe('pipelineDetails', () => {
  it('when pipeline is complete', async () => {
    nock('https://gitlab.com')
      .post('/api/graphql')
      .reply(200, {
        data: {
          project: {
            pipeline: {
              iid: '20',
              complete: true,
              duration: 1000,
              status: 'SUCCESS',
              queuedDuration: 100,
            },
          },
        },
      });

    const output = await pipelineDetails(20);

    expect(output).toContain('Pipeline iid: 20');
    expect(output).toContain('Ran for 1000 seconds');
    expect(output).toContain('Was queued for 100 seconds before starting');
    expect(output).toContain('Has a status of SUCCESS');
  });

  it('when pipeline is not complete', async () => {
    nock('https://gitlab.com')
      .post('/api/graphql')
      .reply(200, {
        data: {
          project: {
            pipeline: {
              iid: '26',
              complete: false,
              duration: 100,
              status: 'RUNNING',
              queuedDuration: 10,
            },
          },
        },
      });

    const output = await pipelineDetails(20);

    expect(output).toContain('Pipeline iid: 26');
    expect(output).toContain('Has a status of RUNNING');
    expect(output).not.toContain('Ran for');
    expect(output).not.toContain('Was queued for');
  });
});

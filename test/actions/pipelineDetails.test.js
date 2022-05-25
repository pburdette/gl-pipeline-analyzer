const nock = require('nock');
const chalk = require('chalk');
const pipelineDetails = require('../../src/actions/pipelineDetails');
const { trimText } = require('../testUtils');

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
    const expectedOutput = `
      Pipeline iid: 20
      Ran for 1000 seconds
      Was queued for 100 seconds before starting
      Has a status of SUCCESS
    `;

    expect(trimText(output)).toBe(trimText(expectedOutput));
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
    const expectedOutput = `
    Pipeline iid: 26
    Has a status of RUNNING
  `;

    expect(trimText(output)).toBe(trimText(expectedOutput));
  });
});

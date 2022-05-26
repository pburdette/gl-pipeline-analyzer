const nock = require('nock');
const latestIid = require('../../src/actions/latestIid');

console.log = jest.fn();

jest.mock('chalk', () => ({
  green: jest.fn((str) => str),
  yellow: jest.fn((str) => str),
}));

jest.mock('../../src/helpers/apiSafeGuard', () =>
  jest.fn().mockReturnValue(true)
);

describe('latestIid', () => {
  it('when project has pipelines', async () => {
    nock('https://gitlab.com')
      .post('/api/graphql')
      .reply(200, {
        data: {
          project: {
            pipelines: {
              nodes: [
                {
                  iid: 10,
                },
              ],
            },
          },
        },
      });

    const output = await latestIid();

    expect(output).toBe('✨ The latest pipeline iid is: 10');
  });

  it('when project has no pipelines', async () => {
    nock('https://gitlab.com')
      .post('/api/graphql')
      .reply(200, {
        data: {
          project: {
            pipelines: {
              nodes: [],
            },
          },
        },
      });

    const output = await latestIid();

    expect(output).toBe('It looks like you do not have any pipelines yet.');
  });
});

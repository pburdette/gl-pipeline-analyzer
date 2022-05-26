const registerToken = require('../../src/actions/registerToken');
const conf = require('../../src/helpers/conf');

console.log = jest.fn();

jest.mock('chalk', () => ({
  green: jest.fn((str) => str),
}));

const token = 'thisIsaMockToken';

describe('registerToken', () => {
  beforeEach(() => {
    jest.spyOn(conf, 'set').mockImplementation();
  });

  it('calls conf with token', async () => {
    await registerToken(token);

    expect(conf.set).toHaveBeenCalledWith('token', token);
  });

  it('returns expected output', async () => {
    const output = await registerToken(token);

    expect(output).toBe(
      `🎉 You have successfully registered your personal access token ${token}`
    );
  });
});

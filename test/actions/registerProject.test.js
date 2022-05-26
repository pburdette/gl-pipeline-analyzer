const registerProject = require('../../src/actions/registerProject');
const conf = require('../../src/helpers/conf');

console.log = jest.fn();

jest.mock('chalk', () => ({
  green: jest.fn((str) => str),
}));

const project = 'pburdette/test-project';

describe('registerProject', () => {
  beforeEach(() => {
    jest.spyOn(conf, 'set').mockImplementation();
  });

  it('calls conf with project', async () => {
    await registerProject(project);

    expect(conf.set).toHaveBeenCalledWith('project', project);
  });

  it('returns expected output', async () => {
    const output = await registerProject(project);

    expect(output).toBe(
      `🎉 You have successfully registered your project ${project}`
    );
  });
});

const { gql, request, GraphQLClient } = require('graphql-request');

const getToken = require('./getToken');
const getProject = require('./getProject');

const token = getToken();
const project = getProject();

const client = new GraphQLClient('https://gitlab.com/api/graphql', {
  headers: { Authorization: `Bearer ${token}` },
});

const getJobsData = (pipelineIid) => {
  const query = gql`
    {
      project(fullPath: "${project}") {
        pipeline(iid: "${pipelineIid}") {
          jobs {
            nodes {
              name
              duration
              queuedDuration
            }
          }
        }
      }
    }
  `;

  return client.request(query);
};

const getLatestPipelineIidData = () => {
  const query = gql`
  {
    project(fullPath: "${project}") {
      pipelines(first: 1) {
        nodes {
          iid
        }
      }
    }
  }
`;

  return client.request(query);
};

const getPipelineDetailsData = (pipelineIid) => {
  const query = gql`
  {
    project(fullPath: "${project}") {
      pipeline(iid: "${pipelineIid}") {
        iid
        complete
        duration
        status
        queuedDuration
      }
    }
  }
`;

  return client.request(query);
};

exports.getJobsData = getJobsData;
exports.getLatestPipelineIidData = getLatestPipelineIidData;
exports.getPipelineDetailsData = getPipelineDetailsData;

const { gql, request, GraphQLClient } = require('graphql-request');

const getToken = require('./getToken');
const getProject = require('./getProject');

const token = getToken();
const project = getProject();

const client = new GraphQLClient('https://gitlab.com/api/graphql', {
  headers: { Authorization: `Bearer ${token}` },
});

const getSlowJobsData = (pipelineIid) => {
  const query = gql`
    {
      project(fullPath: "${project}") {
        pipeline(iid: "${pipelineIid}") {
          jobs {
            nodes {
              name
              duration
            }
          }
        }
      }
    }
  `;

  return client.request(query);
};

const getQueuedDurationJobsData = (pipelineIid) => {
  const query = gql`
  {
    project(fullPath: "${project}") {
      pipeline(iid: "${pipelineIid}") {
        jobs {
          nodes {
            queuedDuration
          }
        }
      }
    }
  }
`;

  return client.request(query);
};

exports.getSlowJobsData = getSlowJobsData;
exports.getQueuedDurationJobsData = getQueuedDurationJobsData;

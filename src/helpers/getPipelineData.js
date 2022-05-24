const { gql, request, GraphQLClient } = require('graphql-request');

const getToken = require('./getToken');
const getProject = require('./getProject');

const token = getToken();
const project = getProject();

const client = new GraphQLClient('https://gitlab.com/api/graphql', {
  headers: { Authorization: `Bearer ${token}` },
});

const getPipelineData = (pipelineIid) => {
  const query = gql`
    {
      project(fullPath: "${project}") {
        pipeline(iid: "${pipelineIid}") {
          duration
          status
          jobs {
            nodes {
              name
              duration
              queuedDuration
              startedAt
              createdAt
            }
          }
        }
      }
    }
  `;

  return client.request(query);
};

module.exports = getPipelineData;

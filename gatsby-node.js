const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const projectPageDesktop = await graphql(`
    {
      allPrismicProjectDesktop {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `);

  projectPageDesktop.data.allPrismicProjectDesktop.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: path.resolve("src/templates/project_desktop.js"),
      context: {
        uid: edge.node.uid,
      },
    });
  });
};

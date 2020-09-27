exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-proposal-decorators",
    options: {
      legacy: true,
    },
  });
};

exports.onCreateWebpackConfig = (
  { stage, actions, loaders },
  { postCssPlugins, ...sassOptions }
) => {
  const PRODUCTION = stage !== "develop";
  const isSSR = stage.includes("html");

  const sassLoader = {
    loader: require.resolve("sass-loader"),
    options: {
      sourceMap: !PRODUCTION,
      sassOptions: {
        ...sassOptions,
        outputStyle: "compact",
      },
    },
  };

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.s(a|c)ss$/,
          use: [
            { loader: require.resolve("classnames-loader") },
            !isSSR && loaders.miniCssExtract(),
            loaders.css({ modules: true, importLoaders: 2 }),
            loaders.postcss({ plugins: postCssPlugins }),
            sassLoader,
          ].filter(Boolean),
        },
      ],
    },
    resolve: {
      modules: ["src", "node_modules"],
    },
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const newsPostTemplate = require.resolve(`./src/templates/NewsTemplate.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(function ({ node }) {
    createPage({
      path: node.frontmatter.slug,
      component: newsPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    });
  });
};

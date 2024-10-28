require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Site Title",
    menuLinks: [
      {
        name: "link",
        link: "/link",
      },
      {
        name: "link",
        link: "/link",
      },
      {
        name: "link",
        link: "/link",
      },
      {
        name: "link",
        link: "/link",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          // "UA-XXXXXXXXX-Y", // Google Universal Analytics (will be deprecated)
          "G-05T3674W2B", // Google Analytics 4
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-K7CHVKZH",

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    // `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          // formats: [`auto`, `webp`],
          // placeholder: `blurred`,
          // quality: 50,
          // breakpoints: [750, 1080, 1366, 1920],
          // backgroundColor: `transparent`,
          // blurredOptions: {},
          // jpgOptions: {},
          // pngOptions: {},
          // webpOptions: {},
          // avifOptions: {},
        },
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Stencil", "Helvetica Neue LT Pro"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Website Name`,
        short_name: `Website Name`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/img/favicon_tf.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `theo-ford-figma-product-2024`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
        schemas: {
          project_desktop: require("./src/schemas/project_desktop.json"),
          about: require("./src/schemas/about.json"),
          category: require("./src/schemas/category.json"),
          project_index_select: require("./src/schemas/project_index_select.json"),
        },
        imageImgixParams: {
          auto: "",
        },
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/global/layout.js`),
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
  ],
};

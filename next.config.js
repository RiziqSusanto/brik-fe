/**
 * @type {import('next').NextConfig}
 */
const withAntdLess = require("next-plugin-antd-less");
const antdVariables = require("./styles/antd_variables");
const withPlugins = require("next-compose-plugins");
const withReactSvg = require("next-react-svg");
const path = require("path");
const withImages = require("next-images");
// const withPWA = require('next-pwa')({
//     // customWorkerDir: 'serviceworker',
//     dest: 'public'
// })
// const runtimeCaching = require('next-pwa/cache')

module.exports = withPlugins([
  [
    withAntdLess,
    {
      modifyVars: antdVariables,
      lessVarsFilePath: "./styles/variables.less",
      lessVarsFilePathAppendToEndOfContent: false,
      cssLoaderOptions: {},
      images: {
        domains: [
          "www.images.unsplash.com",
          "source.unsplash.com",
          "localhost",
        ],
      },
      webpack(config) {
        return config;
      },
    },
  ],
  [withImages],
  [
    withReactSvg,
    {
      include: path.resolve(__dirname, "./public/images"),
    },
  ],
]);

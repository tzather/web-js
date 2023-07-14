// npx karma start
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      { pattern: "controls/**/*.test.js", type: "module", included: true },
      { pattern: "controls/**/*.comp.js", type: "module", included: false },
      { pattern: "app/**/*.test.js", type: "module", included: true },
      { pattern: "app/**/*.comp.js", type: "module", included: false },
    ],
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: false,
    concurrency: Infinity,
  });
};

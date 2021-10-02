const withLess = require("next-with-less");

module.exports = withLess({
  lessLoaderOptions: {
    /* ... */
    lessOptions: {
      /* ... */
      modifyVars: {
        "primary-color": "#222222",
        // "border-radius-base": "2px",
        /* ... */
      },
    },
  },
});

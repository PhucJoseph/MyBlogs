module.exports = {
  style: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('postcss-nesting'),
        require('postcss-preset-env')({ stage: 1 })
      ],
    },
  },
};

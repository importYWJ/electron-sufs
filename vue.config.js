module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8080",
        pathRewrite: {
          "^api": "",
        },
        secure: false, // 不验证SSL证书
        changeOrign: true, // 将主机host的来源更改为目标URL
      },
    },
  },
  // css: {
  //   loaderOptions: {
  //     css: {}
  //   }
  // }
  // configureWebpack: {
  //   modules: {
  //     rules: [
  //       {
  //         test: /\.(css|less)$/,
  //         use: ['css-loader', 'style-loader', 'less-loaders']
  //       }
  //     ]
  //   }
  // }
};

exports.config = {
  // Selenium server 测试服务器接入地址
  SeleniumAddress: 'http://localhost:4444/wd/hub',

  // 告知测试服务器的配置信息
  capabilities: {
    // 告知需要测试的浏览器类型：可以是 chrome、safari等
    'browserName': 'chrome'
  },

  // 需要运行的测试程序代码文件列表
  specs: ['angularjs-e2e-spec.js'],

  // 选择使用 Mocha 作为JavaScript语言的测试框架
  framework: 'mocha'

};

require('./menu-mock')
require('./map-mock')

const Mock = require('mockjs')
// 设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
  timeout: 0 - 300
})

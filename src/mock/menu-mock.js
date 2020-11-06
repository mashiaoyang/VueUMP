import Mock from 'mockjs'

Mock.mock(/\/eump\/role\/menu\/list/, function (opts) {
    console.log('url:get menu list ', opts)
    var method = opts.type
    if (method == 'GET') {
      var info = Mock.mock({
                'status_code': 0,
                'msg': 'get menu list',
                'data': {
                  'content': [
                       {id: 1, name: '首页', web_url: '#/dashboard', class: 'fa-home'},
                       {id: 2, name: '表格', web_url: '#/table', class: 'fa-home'},
                       {id: 3, name: '统计', web_url: '#/statistics', class: 'fa-home'},
                       {id: 4, name: '用户', web_url: '#/users', class: 'fa-home'}
                   ]
            }
      })
      return info
    } else if (method == 'DELETE') {
      return {
                'status_code': 0,
                'msg': 'ok'
      }
    }
  })
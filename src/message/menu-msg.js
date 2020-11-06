import request from '@/utils/request'

export function getMenus () {
  return request({
    url: '/eump/role/menu/list',
    method: 'get'
  })
}
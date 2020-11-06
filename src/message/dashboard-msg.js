import request from '@/utils/request'

export function fetchMapStats () {
  return request({
    url: '/eump/equipment/city/stats',
    method: 'get'
  })
}
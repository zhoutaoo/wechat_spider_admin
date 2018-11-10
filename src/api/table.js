import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/articles',
    method: 'get',
    params
  })
}

export function getMpList(params) {
  return request({
    url: '/mps',
    method: 'get',
    params
  })
}

export function getMpCount() {
  return request({
    url: '/mps/counts',
    method: 'get'
  })
}

import request from '@/utils/request'

export function tradeAmount(params) {
  return request({
    url: 'Analyze/tradeAmount',
    method: 'post',
    data: params
  })
}

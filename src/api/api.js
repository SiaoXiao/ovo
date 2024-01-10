import { requestService } from './request'

// Get 取得員工基本資料
export function apiGetMembers() {
  return requestService({
    url: '/members',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

// Post 搜尋員工資料
export function apiPostSearch(data) {
  return requestService({
    url: '/members/search',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

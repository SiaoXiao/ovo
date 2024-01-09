import { requestService } from './request'

// Get OTP碼
export function apiGetMembers() {
  return requestService({
    url: '/members',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

/* 會員相關 */
// Post 取得會員
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

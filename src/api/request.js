import axios from 'axios'

// 創建axios實例
export function requestService(config) {
  const service = axios.create({
    baseURL:'http://35.194.177.50:7777',
    timeout: 30000,
    headers: config.headers,
  })

  // request攔截
  service.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // response攔截
  service.interceptors.response.use(
    (response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return service(config)
}

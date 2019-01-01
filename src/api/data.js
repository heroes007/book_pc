import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getData = (url, data) => {
  return axios.request({
    url,
    method: 'get',
    params: {...data}
  })
}

export const postData = (url, data) => {
  return axios.request({
    url,
    method: 'post',
    data: {...data}
  })
}

export const deleteData = (url, data) => {
  return axios.request({
    url,
    method: 'delete',
    data: {...data}
  })
}

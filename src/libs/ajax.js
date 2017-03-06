import axios from 'axios';
import { notification } from 'antd';

const $http = axios.create({});

// response
$http.interceptors.response.use(
  ({ data: { data } }) => data,
  ({ response }) => {
    notification.error({
      message: '错误',
      description: '请求错误，请稍后再试',
    });
    return Promise.reject(response);
  },
);

export default $http;

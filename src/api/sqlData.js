import $http from '../libs/ajax';

export const getTableHIAP = params => (
  $http.get('api/hbzc', params)
    .then(data => Promise.resolve(data['p=j'])));

// todo 表单 HIAP 的 ajax
export const getTablePage = params => (
  $http.get('api/pageWhichIsNo', params)
    .then(data => Promise.resolve(data))
);

export default {
  getTableHIAP,
  getTablePage,
};


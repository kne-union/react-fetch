import axios from 'axios';
import withAxios from './axiosCache/index';

export const globalParams = {
  ajax: axios.create(),
  createConfig: null,
  loading: null,
  error: null,
  empty: null,
  transformResponse: (response) => {
    const { data } = response;
    response.data = {
      code: data.code,
      msg: data.msg,
      results: data.results
    };
    return response;
  }
};

export let instance = withAxios(globalParams.ajax, globalParams);

export default (newOptions) => {
  let newParams = Object.assign(globalParams, newOptions);
  instance = withAxios(newParams.ajax, newParams);
  return newParams;
};



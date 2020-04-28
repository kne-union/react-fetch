import axios from 'axios';

export const globalParams = {
  ajax: axios.create(),
  loading: null,
  error: null,
  empty:null,
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

export default (newOptions) => {
  return Object.assign(globalParams, newOptions);
};



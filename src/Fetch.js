import React, { memo, forwardRef } from 'react';
import isFunction from 'lodash/isFunction';
import objectHash from 'object-hash';
import useFetch from './useFetch';
import { globalParams } from './preset';

export default memo(forwardRef(({ url, data, loading = globalParams.loading, error = globalParams.error, component, render, options, ...props }, ref) => {
  const { isLoading, errorMsg, results } = useFetch({ url, data, options }, ref);

  if (isLoading) {
    return loading;
  }

  if (errorMsg !== undefined) {
    if (isFunction(error)) {
      return error(errorMsg);
    }
    return error;
  }

  if (component) {
    const FetchComponent = component;
    return <FetchComponent {...props} data={results}/>;
  }

  if (render) {
    return render({ ...props, data: results });
  }

  throw new Error('请传入component参数或者render参数');
}, (prevProps, nextProps) => {
  return objectHash(prevProps) !== objectHash(nextProps);
}));

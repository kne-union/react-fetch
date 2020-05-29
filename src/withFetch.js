import React, {forwardRef} from 'react';
import Fetch from './Fetch';
import pick from 'lodash/pick';
import merge from 'lodash/merge';

const withFetch = (WrappedComponent) => {
  return forwardRef((props, ref) => <Fetch {...props} component={WrappedComponent} ref={ref}/>);
};

export default withFetch;

export const createWithFetch = (params) => (WrappedComponent) => {
  const pickParams = pick(params, ['url', 'data', 'options', 'loading', 'error', 'auto']);
  const FetchComponent = withFetch(WrappedComponent);
  return forwardRef((props, ref) => <FetchComponent {...merge({}, pickParams, props)} ref={ref}/>);
};

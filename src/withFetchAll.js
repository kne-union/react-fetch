import React, {forwardRef} from 'react';
import FetchAll from './FetchAll';
import pick from 'lodash/pick';
import merge from 'lodash/merge';

const withFetchAll = (WrappedComponent) => {
  return forwardRef((props, ref) => <FetchAll {...props} component={WrappedComponent} ref={ref}/>);
};

export default withFetchAll;

export const createWithFetchAll = (params) => (WrappedComponent) => {
  const pickParams = pick(params, ['fetchers', 'loading', 'error', 'auto']);
  const FetchComponent = withFetchAll(WrappedComponent);
  return forwardRef((props, ref) => <FetchComponent {...merge({}, pickParams, props)} ref={ref}/>);
};

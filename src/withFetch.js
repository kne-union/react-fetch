import React, {forwardRef} from 'react';
import Fetch from './Fetch';
import merge from 'lodash/merge';

const withFetch = (WrappedComponent) => {
    return forwardRef((props, ref) => <Fetch {...props} component={WrappedComponent} ref={ref}/>);
};

export default withFetch;

export const createWithFetch = (params) => (WrappedComponent) => {
    const FetchComponent = withFetch(WrappedComponent);
    return forwardRef((props, ref) => <FetchComponent {...merge({}, params, props)} ref={ref}/>);
};

import React, {forwardRef} from 'react';
import useFetch from './useFetch';
import {globalParams} from './preset';
import useFetchRender from './useFetchRender';

export default forwardRef(({
                               url,
                               auto = true,
                               data,
                               params,
                               method,
                               loading = globalParams.loading,
                               empty = globalParams.empty,
                               error = globalParams.error,
                               component,
                               render,
                               options,
                               ...props
                           }, ref) => {
    const fetcher = useFetch({url, auto, params, method, data, options}, ref);
    return useFetchRender({loading, error, empty, component, render, props, ...fetcher});
});
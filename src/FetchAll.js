import React, {memo, forwardRef} from 'react';
import objectHash from 'object-hash';
import useFetchAll from './useFetchAll';
import {globalParams} from './preset';
import useFetchRender from './useFetchRender';

export default memo(forwardRef(({fetchers, auto = true, loading = globalParams.loading, empty = globalParams.empty, error = globalParams.error, component, render, ...props}, ref) => {
    const fetcher = useFetchAll({fetchers, auto}, ref);
    return useFetchRender({loading, error, empty, component, render, props, ...fetcher});
}, (prevProps, nextProps) => {
    return objectHash(prevProps) !== objectHash(nextProps);
}));

import React, {forwardRef, useImperativeHandle} from 'react';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import useFetch from './useFetch';
import {globalParams} from './preset';

const Fetch = forwardRef(({component, render, loading, empty, error: errorComponent, ...props}, ref) => {
    const {isLoading, isComplete, data, error, send, refresh, reload, loadMore, setData} = useFetch(props);
    const fetchPropsList = ['url', 'params', 'method', 'data', 'cache', 'ttl', 'isLocal', 'auto', 'loader', 'options'];
    const otherProps = omit(props, fetchPropsList);
    const fetchProps = pick(props, fetchPropsList);
    useImperativeHandle(ref, () => {
        return {
            isLoading, isComplete, data, error, send, refresh, reload, loadMore, setData
        };
    });
    if (isLoading) {
        return loading || globalParams.loading;
    }
    if (error) {
        const _error = errorComponent || globalParams.error;
        if (typeof _error === 'function') {
            return _error(error);
        }
        return _error;
    }

    if (!data) {
        return empty || globalParams.empty;
    }

    if (component) {
        const FetchComponent = component;
        return <FetchComponent {...otherProps} fetchProps={fetchProps} isComplete={isComplete} data={data}
                               refresh={refresh}
                               reload={reload}
                               setData={setData} loadMore={loadMore} send={send}/>;
    }

    if (render) {
        return render({...otherProps, fetchProps, isComplete, data, refresh, reload, setData, loadMore, send});
    }

    throw new Error('请传入component参数或者render参数');
});

export default Fetch;

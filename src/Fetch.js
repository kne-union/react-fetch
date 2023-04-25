import React, {forwardRef, useImperativeHandle} from 'react';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import useFetch from './useFetch';
import {globalParams} from './preset';

const Fetch = forwardRef(({component, render, loading, isEmpty, empty, error: errorComponent, ...props}, ref) => {
    const {
        isLoading, isComplete, data, requestParams, error, send, refresh, reload, loadMore, setData
    } = useFetch(props);
    const fetchPropsList = ['url', 'params', 'method', 'data', 'cache', 'ttl', 'isLocal', 'auto', 'loader', 'options', 'updateType', 'onRequestError', 'onRequestSuccess', 'onRequestComplete', 'onRequestStart', 'debug', 'ajax', 'transformData', 'transformResponse'];
    const otherProps = omit(props, fetchPropsList);
    const fetchProps = pick(props, fetchPropsList);
    useImperativeHandle(ref, () => {
        return {
            isLoading, isComplete, data, requestParams, error, send, refresh, reload, loadMore, setData
        };
    });
    if (isLoading) {
        return loading === void (0) ? globalParams.loading : loading;
    }
    if (error) {
        const _error = errorComponent === void (0) ? globalParams.error : errorComponent;
        if (typeof _error === 'function') {
            return _error(error);
        }
        return _error;
    }

    if (!isComplete && !data) {
        return null;
    }

    if (typeof isEmpty === 'function' ? isEmpty(data, requestParams) : !data) {
        return empty === void (0) ? globalParams.empty : empty;
    }

    if (component) {
        const FetchComponent = component;
        return <FetchComponent {...otherProps} fetchProps={fetchProps} isComplete={isComplete} data={data}
                               refresh={refresh}
                               reload={reload}
                               setData={setData} loadMore={loadMore} send={send} requestParams={requestParams}/>;
    }

    if (render) {
        return render({
            ...otherProps, fetchProps, isComplete, data, refresh, reload, setData, loadMore, send, requestParams
        });
    }

    throw new Error('请传入component参数或者render参数');
});

export default Fetch;

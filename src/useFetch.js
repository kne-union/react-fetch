import {useRef, useEffect, useState, useMemo} from 'react';
import objectHash from "object-hash";
import {createRunner} from './plugins';
import pick from 'lodash/pick';

const useFetch = (fetcherOptions) => {
    const props = Object.assign({
        auto: true,
        updateType: 'reload'
    }, fetcherOptions);

    const propsRef = useRef(props);
    propsRef.current = props;

    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [fetchData, setFetchData] = useState(null);
    const [error, setError] = useState(null);
    const [requestParams, setRequestParams] = useState({});

    const stateRef = useRef({
        isLoading, isComplete, fetchData, error, requestParams
    });
    stateRef.current = {
        isLoading, isComplete, fetchData, error, requestParams
    };

    const requestToken = objectHash(pick(props, ['url', 'params', 'method', 'data', 'options']), {
        algorithm: 'md5',
        encoding: 'base64'
    });
    const requestTokenRef = useRef(requestToken);
    requestTokenRef.current = requestToken;

    const pluginRunnerRef = useRef();

    useMemo(() => {
        pluginRunnerRef.current = createRunner({
            getProps: () => propsRef.current,
            getRequestToken: () => requestTokenRef.current,
            requestParams,
            setRequestParams,
            setFetchData,
            setError,
            setIsComplete,
            setIsLoading
        });
    }, []);

    const send = (sendProps, force = true) => {
        return pluginRunnerRef.current(Object.assign({}, sendProps, {force}));
    };
    const refresh = (sendProps, force = true) => {
        return pluginRunnerRef.current(Object.assign({}, sendProps, {force, type: 'refresh'}));
    };
    const reload = (sendProps, force = true) => {
        return pluginRunnerRef.current(Object.assign({}, sendProps, {force, type: 'reload'}));
    };
    const loadMore = (sendProps, callback, force = true) => {
        return pluginRunnerRef.current(Object.assign({}, sendProps, {force, callback, type: 'load-more'}));
    };

    const apiRef = useRef({});
    apiRef.current = {
        send, refresh, reload, loadMore, setData: setFetchData
    };
    useEffect(() => {
        if (propsRef.current.auto) {
            if (stateRef.current.isComplete) {
                apiRef.current.send({type: propsRef.current.updateType}, false);
            } else {
                apiRef.current.refresh({}, false);
            }
        }
    }, [requestToken]);

    return {
        isLoading, isComplete, data: fetchData, error,
        send, refresh, reload, loadMore, setData: setFetchData, requestParams
    };
};

export default useFetch;

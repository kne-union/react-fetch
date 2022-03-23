import {useRef, useEffect, useState} from 'react';
import {globalParams} from './preset';
import isEqual from 'lodash/isEqual';
import objectHash from "object-hash";

class Request {
    constructor(options) {
        const {cache, ttl} = Object.assign({}, options);
        this.cahce = cache;
        this.ttl = ttl;
        this.options = null;
        this.data = null;
    }

    _sendWithCache(options, callback) {
        const {isLocal, ...requestOptions} = options;
        if (!this.cahce) {
            return callback(requestOptions);
        }
        const cacheKey = (this.cahce === true ? '' : this.cahce) + objectHash(requestOptions, {
            algorithm: 'md5',
            encoding: 'base64'
        });
        let cacheData = globalParams.cache.get(cacheKey);
        if (!cacheData) {
            cacheData = callback(requestOptions);
            globalParams.cache.put(cacheKey, cacheData, {ttl: this.ttl, isLocal});
        }
        return Promise.resolve(cacheData);
    }

    send(options, force) {
        if (force || !isEqual(options, this.options)) {
            this.data = this._sendWithCache(options, (options) => globalParams.ajax(options));
        }
        this.options = options;
        return this.data;
    }
}

const useFetch = (fetcherOptions) => {
    const {url, params, method, data, cache, ttl, auto, loader, isLocal, options} = Object.assign({
        auto: true
    }, fetcherOptions);

    const requestRef = useRef(new Request({cache, ttl}));

    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [fetchData, setFetchData] = useState(null);
    const [error, setError] = useState(null);

    const fetcherOptionsRef = useRef({
        url, params, method, data, options, isLocal
    });

    fetcherOptionsRef.current = {
        url, params, method, data, options, isLocal
    };

    const send = (sendProps, force) => {
        const {options, ...props} = fetcherOptionsRef.current;
        const mergeData = Object.assign({}, options, props, sendProps);
        setIsComplete(false);
        return (() => {
            if (typeof apiRef.current.loader === 'function') {
                return Promise.resolve(apiRef.current.loader(mergeData)).then((data) => ({
                    data: {
                        code: 200,
                        results: data
                    }
                }));
            } else {
                return requestRef.current.send(mergeData, force).then((response) => {
                    return globalParams.transformResponse(response);
                }, (e) => {
                    console.error(e);
                    setError(e.message || '请求发生错误');
                });
            }
        })().then(({data}) => {
            if (data.code !== 200) {
                const errMsg = data.msg || '请求发生错误';
                setError(errMsg);
                throw new Error(errMsg);
            }
            return data.results;
        }).finally(() => {
            setIsComplete(true);
        });
    };

    const refresh = () => {
        setIsLoading(true);
        return send({}, true).then((data) => {
            setFetchData(data);
            return data;
        }).finally(() => {
            setIsLoading(false);
        });
    };
    const reload = () => {
        return send({}, true).then((data) => {
            setFetchData(data);
        });
    };
    const loadMore = (sendProps, callback) => {
        return send(sendProps).then((data) => {
            setFetchData((old) => {
                return callback(old, data);
            });
        });
    };

    const apiRef = useRef({});
    apiRef.current = {
        send, refresh, reload, loadMore, auto, loader, setData: setFetchData
    };

    useEffect(() => {
        apiRef.current.auto && apiRef.current.refresh();
    }, [url, params, method, data, options]);

    return {
        isLoading, isComplete, data: fetchData, error,
        send, refresh, reload, loadMore, setData: setFetchData
    };
};

export default useFetch;

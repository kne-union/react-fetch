import {useCallback,useRef} from 'react';
import useFetchCreate from './useFetchCreate';
import {globalParams, instance} from './preset';

export default ({auto = true, url, params, method, data, loader, options}, ref) => {
    const loaderRef = useRef(loader);
    loaderRef.current = loader;
    const fetcher = useCallback(() => {
        return instance({
            url, params, method, data, ...options
        }).then((response) => {
            return globalParams.transformResponse(response);
        })
    }, [url, params, method, data, options]);
    const loaderFetch = useCallback(()=>{
        return Promise.resolve(loaderRef.current()).then((data) => ({
            data: {
                code: 200,
                results: data
            }
        }))
    },[]);
    return useFetchCreate({
        fetcher: typeof loader === 'function' ? loaderFetch : fetcher, auto
    }, ref);
};

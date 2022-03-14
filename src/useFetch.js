import {useCallback} from 'react';
import useFetchCreate from './useFetchCreate';
import {globalParams, instance} from './preset';

export default ({auto = true, url, params, method, data, options}, ref) => {
    const fetcher = useCallback(() => {
        return instance({
            url, params, method, data, ...options
        }).then((response) => {
            return globalParams.transformResponse(response);
        })
    }, [url, params, method, data, options]);
    return useFetchCreate({
        fetcher, auto
    }, ref);
};

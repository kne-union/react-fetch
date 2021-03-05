import {useCallback} from 'react';
import useFetchCreate from './useFetchCreate';
import {globalParams, instance} from './preset';

export default ({auto = true, url, params, data, options}, ref) => {
    const fetcher = useCallback(() => {
        return instance({
            ...options,
            url,
            params,
            data
        }).then((response) => {
            return globalParams.transformResponse(response);
        })
    }, [url, params, data, options]);
    return useFetchCreate({
        fetcher,
        auto
    }, ref);
};

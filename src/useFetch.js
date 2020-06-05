import {useCallback} from 'react';
import useFetchCreate from './useFetchCreate';
import {globalParams, instance} from './preset';

export default ({auto = true, url, data, options}, ref) => {
    const fetcher = useCallback(() => {
        return instance({
            ...options,
            url,
            data
        }).then((response) => {
            return globalParams.transformResponse(response);
        })
    }, [url, data, options]);
    return useFetchCreate({
        fetcher,
        auto
    }, ref);
};

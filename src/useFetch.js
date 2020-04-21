import {useCallback, useEffect, useImperativeHandle} from 'react';
import useState from './useSafeState';
import {globalParams} from './preset';

export default ({url, data, options}, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState({});
    const [errorMsg, setErrorMsg] = useState();
    const send = useCallback(() => {
        setIsLoading(true);
        return globalParams.ajax({
            ...options,
            url,
            data
        }).then((response) => {
            const {data} = globalParams.transformResponse(response);
            if (data.code === 200) {
                setResults(data.results);
            } else {
                setErrorMsg(data.msg || '请求错误');
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }, [url, data, options]);

    useImperativeHandle(ref, () => {
        return {
            refresh: () => send()
        };
    }, [send]);

    useEffect(() => {
        send();
    }, [send]);

    return {isLoading, errorMsg, results, send};
};

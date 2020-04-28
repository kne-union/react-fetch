import {useCallback, useEffect, useImperativeHandle} from 'react';
import useState from './useSafeState';

export default ({fetcher, auto}, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [results, setResults] = useState({});
    const [errorMsg, setErrorMsg] = useState();
    const send = useCallback((force) => {
        setIsLoading(true);
        return fetcher(force).then(({data}) => {
            if (data.code === 200) {
                setResults(data.results);
                setIsComplete(true);
            } else {
                setErrorMsg(data.msg || '请求错误');
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }, [fetcher]);

    const refresh = useCallback((force = true) => send(force), [send]);

    useImperativeHandle(ref, () => {
        return {refresh};
    }, [refresh]);

    useEffect(() => {
        auto && send();
    }, [auto, send]);

    return {isLoading, isComplete, errorMsg, results, refresh};
};

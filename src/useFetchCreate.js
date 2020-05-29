import {useRef, useCallback, useEffect, useImperativeHandle} from 'react';
import useState from './useSafeState';

export default ({fetcher, auto}, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const isInit = useRef(true);
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
  const setData = useCallback((newResults) => {
    setResults(newResults);
  }, [setResults]);

  useImperativeHandle(ref, () => {
    return {data: results, refresh, setData};
  }, [results, refresh, setData]);

  useEffect(() => {
    auto && send(isInit.current);
    isInit.current = false;
  }, [auto, send]);

  return {isLoading, isComplete, errorMsg, results, refresh, setData};
};

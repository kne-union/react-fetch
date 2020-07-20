import { useCallback } from 'react';
import useFetchCreate from './useFetchCreate';
import { globalParams } from './preset';
import fetchMemo from './fetchMemo';
import resultsMerge from './resultsMerge';

export default ({ auto = true, fetchers }, ref) => {
    const fetcher = useCallback((force) => {
        return Promise.all(fetchers.map((item) => fetchMemo(item, force))).then((list) => {
            const dataList = list.map((response) => globalParams.transformResponse(response).data);
            if (dataList.every((data) => data.code === 200)) {
                return {
                    data: resultsMerge(dataList)
                };
            } else {
                const resData = dataList.find(({data})=>data.code!==200);
                return {
                    data:resData
                };
            }
        });
    }, [fetchers]);
    return useFetchCreate({
        fetcher,
        auto
    }, ref);
};

import {createWithFetch, preset} from '@kne/react-fetch';
import {useState} from 'react';

preset({
    loading: 'loading....',
    empty: '空',
    transformResponse: (response) => {
        const {data} = response;
        response.data = {
            code: data.code === 0 ? 200 : data.code, msg: data.msg, results: data.data
        };
        return response;
    }
});

const Remote = createWithFetch({
    url: '/react-fetch/mock/data.json',
    params: {
        page: 1,
        size: 10
    }
})(({data, reload, refresh, loadMore, requestParams}) => {
    console.log(requestParams);
    const [page, setPage] = useState(1);
    return <div>
        组件
        <button onClick={() => {
            refresh({
                params:{state:123}
            });
        }}>刷新</button>
        <button onClick={() => {
            reload();
        }}>重载
        </button>
        {data.list.map((item, index) => <div key={index}>{item.name}</div>)}
        <button onClick={() => {
            const currentPage = page + 1;
            setPage(currentPage);
            loadMore({}, (data, newData) => {
                return Object.assign({}, newData, {
                    list: data.list.concat(newData.list)
                });
            });
        }}>加载更多{page}
        </button>
    </div>;
});

const App = () => {
    return <Remote/>;
};

export default App;

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
    updateType: 'nextPage'
})(({data, send, reload, refresh, loadMore, requestParams}) => {
    console.log(data, requestParams);
    return <div>
        组件
        <button onClick={() => {
            refresh({
                params: {state: 123}
            });
        }}>刷新</button>
        <button onClick={() => {
            reload();
        }}>重载
        </button>
        {data.list.map((item, index) => <div key={index}>{item.name}</div>)}
        <button onClick={() => {
            loadMore({params: {page: requestParams.params.page + 1}}, (data, newData) => {
                return Object.assign({}, newData, {
                    list: data.list.concat(newData.list)
                });
            });
        }}>加载更多{requestParams.params.page}
        </button>
        <button onClick={() => {
            refresh({page: 1, size: 10});
        }}>
            页面1
        </button>
        <button onClick={() => {
            refresh({page: 2, size: 10});
        }}>
            页面2
        </button>
    </div>;
});

const LoadingRemote = createWithFetch({
    loader: () => {
        return {
            data: '哈哈哈哈'
        }
    }
})(({data}) => {
    return <div>{data.data}</div>
});

const CacheRemote = createWithFetch({
    url: '/react-fetch/mock/data.json'
})(({data}) => {
    return data.list.map((item, index) => <div key={index}>{item.name}</div>);
});

const LoadError = createWithFetch({
    url: '/react-fetch/mock/error.json',
    error: (msg) => msg,
    onError: (e) => {
        console.log(e[0].responseData);
    }
})(({data}) => {
    return 'xxxxx';
});

const App = () => {
    const [sum, setSum] = useState(1);
    return <>
        <Remote params={{sum}}/>
        <button onClick={() => {
            setSum((sum) => sum + 1);
        }}>
            修改
        </button>
        <LoadingRemote/>
        <CacheRemote/>
        <CacheRemote/>
        <LoadError/>
    </>;
};

export default App;

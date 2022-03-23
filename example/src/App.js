import {createWithFetch, preset} from '@kne/react-fetch';
import {useState} from 'react';

preset({
    loading: 'loading....'
});

const Remote = createWithFetch({
    url: '/react-fetch/mock/data.json',
})(({data, reload, refresh, loadMore}) => {
    const [page, setPage] = useState(1);
    return <div>
        组件
        <button onClick={() => {
            refresh();
        }}>刷新</button>
        <button onClick={() => {
            reload();
        }}>重载
        </button>
        {data.list.map((item, index) => <div key={index}>{item.name}</div>)}
        <button onClick={() => {
            const currentPage = page + 1;
            setPage(currentPage);
            loadMore({params: {page: currentPage}}, (data, newData) => {
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

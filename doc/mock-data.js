const {preset} = ReactFetch;
const {Input,Spin,Empty,Result,Space} = antd;

let timeout = 1000;

preset({
    ajax: (config) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (config.url === '/data1') {
                    console.log('data1 request');
                    resolve({
                        data: {
                            code: 0,
                            data: [
                                {title: '数据一'},
                                {title: '数据二'}
                            ]
                        }
                    });
                    return;
                }
                if (config.url === '/data3') {
                    console.log('data1 request');
                    resolve({
                        data: [
                            {title: '数据一'},
                            {title: '数据二'}
                        ]
                    });
                    return;
                }
                if (config.url === '/data2') {
                    resolve({
                        data: {
                            code: 0,
                            data: {
                                list: _.range(0, config.params.size || 10).map((index) => {
                                    return {
                                        title: config.params.page + '页，数据' + (index + 1)
                                    }
                                }),
                                total: 100
                            }
                        }
                    });
                    return;
                }
                return resolve({
                    data: {
                        code: 404,
                        msg: '没找到资源'
                    }
                });
            }, timeout);
        });
    },
    loading: <Spin>数据加载中...</Spin>,
    empty: <Empty/>,
    error: (msg) => <Result title={msg}/>,
    transformResponse: (response) => {
        const {data} = response;
        response.data = {
            code: data.code === 0 ? 200 : data.code, msg: data.msg, results: data.data
        };
        return response;
    }
});

const Preset = () => {
    return <Space direction="vertical">
        <div>该组件只设置其他示例的mock data，不展示任何功能</div>
        <div>这里可以设置模拟请求延迟时间</div>
        <Input type="text" defaultValue={timeout} onChange={(e) => {
            timeout = parseInt(e.target.value);
        }} addonAfter="ms"/>
    </Space>
};

render(<Preset/>);

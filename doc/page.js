const {useState} = React;
const {createWithFetch} = ReactFetch;
const {Button,Pagination,Space,List} = antd;

const Page = createWithFetch({
    url: '/data2',
    params: {page: 1, size: 10}
})(({data, requestParams, isRefresh, reload, refresh}) => {
    return <Space direction="vertical">
        <List bordered>
            {data.list.map((item, index) => {
                return <List.Item key={index}>{item.title}</List.Item>
            })}
        </List>
        <div>
            <Pagination current={requestParams.params.page} total={data.total}
                        pageSize={requestParams.params.size} onChange={(page, size) => {
                (isRefresh ? refresh : reload)({params: {page, size}});
            }}/>
        </div>
    </Space>;
});

const Remote = () => {
    const [isRefresh, setIsRefresh] = useState(false);
    return <Space direction="vertical">
        <div>
            <Button type="primary" onClick={() => {
                setIsRefresh((value) => !value);
            }}>以{isRefresh ? 'refresh' : 'reload'}方式加载
            </Button>
        </div>
        <Page isRefresh={isRefresh}/>
    </Space>
};

render(<Remote/>);

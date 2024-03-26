const {createWithFetch, getCache} = ReactFetch;
const {List,Space,Button} = antd;

const {useRef} = React;

const Remote = createWithFetch({
    url: '/data1',
    cache: 'cache'
})(({data}) => {
    return <List bordered>
        {data.map((item, index) => {
            return <List.Item key={index}>{item.title}</List.Item>
        })}
    </List>;
});

const cache = getCache();

const Example = () => {
    const ref = useRef();
    return <Space direction="vertical">
        <Remote ref={ref}/>
        <Space>
            <Button onClick={() => {
                ref.current.reload({}, false);
            }}>获取数据</Button>
            <Button onClick={() => {
                cache.delByCacheName('cache');
            }}>清除缓存</Button>
        </Space>
    </Space>;
};

render(<Example/>);

const {createWithFetch} = ReactFetch;
const {List} = antd;

const Remote = createWithFetch({
    url: '/data1',
    isEmpty: () => true
})(({data}) => {
    return <List bordered>
        {data.map((item, index) => {
            return <List.Item key={index}>{item.title}</List.Item>
        })}
    </List>;
});

render(<Remote/>);

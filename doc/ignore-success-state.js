const {createWithFetch} = ReactFetch;
const {List} = antd;

const Remote = createWithFetch({
    url: '/data3', ignoreSuccessState: true
})(({data}) => {
    return <List bordered>
        {data.map((item, index) => {
            return <List.Item key={index}>{item.title}</List.Item>
        })}
    </List>;
});

render(<Remote/>);

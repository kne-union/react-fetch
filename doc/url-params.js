const {createWithFetch} = ReactFetch;
const {List} = antd;

const Remote = createWithFetch({
    url: '/data{id}', urlParams: {
        id: 1
    }
})(({data}) => {
    return <List bordered>
        {data.map((item, index) => {
            return <List.Item key={index}>{item.title}</List.Item>
        })}
    </List>;
});

render(<Remote/>);

const {createWithFetch} = ReactFetch;
const {List} = antd;

const Remote = createWithFetch({
    url: '/data1',
    transformResponse: (response) => {
        console.log(response);
        return {
            data:{
                code: 200, results: [
                    {title: '我是response被拦截以后的内容'}
                ]
            }
        };
    }
})(({data}) => {
    return <List bordered>
        {data.map((item, index) => {
            return <List.Item key={index}>{item.title}</List.Item>
        })}
    </List>;
});

render(<Remote/>);

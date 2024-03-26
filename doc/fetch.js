const {default: Fetch} = ReactFetch;
const {List} = AntdList;

const Remote = () => {
    return <Fetch url="/data1" loader={() => {
        return new Promise((resolve) => {
            resolve([{title:'loader数据'}]);
        })
    }} render={({data}) => {
        return <List bordered>
            {data.map((item, index) => {
                return <List.Item key={index}>{item.title}</List.Item>
            })}
        </List>
    }}/>
};

render(<Remote/>);

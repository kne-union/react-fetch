const {createWithFetch} = ReactFetch;


const Example = createWithFetch({
    loader: async (data) => {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign({}, data, {message: '请求成功'}));
            }, 1000);
        });
    }
})(({data,requestParams}) => {
    console.log(requestParams);
    return JSON.stringify(data, null, 2);
});

render(<Example data={{name: 'jack'}}/>);

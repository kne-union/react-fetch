const {createWithFetch} = ReactFetch;

const Error = createWithFetch({
    url: '/error'
})(() => {
    return '这是一个错误请求';
});

render(<Error/>);

const {useEffect, forwardRef, useRef, useImperativeHandle} = React;
const {createWithFetch} = ReactFetch;
const {Space,List,Spin} = antd;
const {throttle} = _;

const ScrollLoader = forwardRef(({
                                     className,
                                     noMore,
                                     getScrollContainer,
                                     onLoader,
                                     isLoading,
                                     completeTips,
                                     children
                                 }, ref) => {
    const scrollerRef = useRef();
    const onLoaderHandlerRef = useRef(onLoader);
    onLoaderHandlerRef.current = onLoader;
    const canLoadRef = useRef(!noMore && !isLoading);
    canLoadRef.current = !noMore && !isLoading;
    useImperativeHandle(ref, () => {
        return scrollerRef.current;
    }, []);
    useEffect(() => {
        if (canLoadRef.current && scrollerRef.current.clientHeight === scrollerRef.current.scrollHeight) {
            onLoaderHandlerRef.current();
        }
    }, [isLoading]);
    useEffect(() => {
        const el = scrollerRef.current;
        const scrollHandler = throttle((e) => {
            const el = e.target;
            if (canLoadRef.current && el.clientHeight + el.scrollTop + 20 > el.scrollHeight) {
                onLoaderHandlerRef.current();
            }
        }, 100);
        el.addEventListener('scroll', scrollHandler, true);
        return () => {
            el.removeEventListener('scroll', scrollHandler, true);
        };
    }, []);
    return <div ref={scrollerRef} className="load-container">
        <Space direction='vertical'>
            <div>{children}</div>
            {isLoading ? <div className='scroller-no-more'><Spin/></div> : null}
            {noMore ? <div className='scroller-no-more'>{completeTips}</div> : null}
        </Space>
    </div>;
});

const Remote = createWithFetch({
    url: '/data2',
    params: {page: 1, size: 10}
})(({data, isComplete, requestParams, loadMore}) => {
    return <ScrollLoader isLoading={!isComplete}
                         noMore={isComplete && requestParams.params.page >= Math.ceil(data.total / requestParams.params.size)}
                         onLoader={() => {
                             return loadMore({
                                 params: {page: requestParams.params.page + 1}
                             }, (data, newData) => {
                                 return Object.assign({}, newData, {
                                     list: data.list.concat(newData.list)
                                 });
                             });
                         }} completeTips="加载完成">
        <List bordered>
            {data.list.map((item, index) => {
                return <List.Item key={index}>{item.title}</List.Item>
            })}
        </List>
    </ScrollLoader>;
});


render(<Remote/>);

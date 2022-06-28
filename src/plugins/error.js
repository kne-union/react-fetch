export default {
    id: 'error',
    plugin: (props, context) => {
        const {onError} = context.componentContext.getProps();
        const {setError} = context.componentContext;
        if (Object.keys(context.errorStack).length > 0) {
            const errorMsg = Object.values(context.errorStack).map((e) => {
                return e.message;
            }).filter((msg) => !!msg).join('\n');
            onError && onError(Object.values(context.errorStack));
            setError(errorMsg || '请求发生错误');
        }
    }
};

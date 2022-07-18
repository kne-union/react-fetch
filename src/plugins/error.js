export default {
    id: 'error',
    plugin: (props, context) => {
        const {onRequestError, onRequestComplete} = context.componentContext.getProps();
        const {setError} = context.componentContext;
        if (Object.keys(context.errorStack).length > 0) {
            const errorMsg = Object.values(context.errorStack).map((e) => {
                return e.message;
            }).filter((msg) => !!msg).join('\n');
            onRequestError && onRequestError(Object.values(context.errorStack));
            setError(errorMsg || '请求发生错误');
        }
        onRequestComplete && onRequestComplete(context);
    }
};

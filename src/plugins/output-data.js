export default {
    id: 'output-data', plugin: (props, context) => {
        const {onRequestSuccess} = context.componentContext.getProps();
        if (Object.keys(context.errorStack).length > 0) {
            return;
        }
        const responseData = context.output.data;
        if (responseData.code !== 200) {
            const error = new Error(responseData.msg);
            error.responseData = responseData;
            throw error;
        }
        const output = responseData.results || {};
        onRequestSuccess && onRequestSuccess(output);
        return output;
    }, dependencies: ['request']
};

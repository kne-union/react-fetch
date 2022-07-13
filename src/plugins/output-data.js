export default {
    id: 'output-data',
    plugin: (props, context) => {
        const responseData = context.output.data;
        if (responseData.code !== 200) {
            const error = new Error(responseData.msg);
            error.responseData = responseData;
            throw error;
        }
        return responseData.results || {};
    },
    dependencies: ['request']
};

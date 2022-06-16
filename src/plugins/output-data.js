export default {
    id: 'output-data',
    plugin: (props, context) => {
        const responseData = context.output.data;
        if (responseData.code !== 200) {
            throw new Error(responseData.msg);
        }
        return responseData.results;
    },
    dependencies: ['request']
};

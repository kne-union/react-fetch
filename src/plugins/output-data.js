export default {
    id: 'output-data', plugin: (props, context) => {
        const {options, onRequestSuccess, ignoreSuccessState, transformData} = context.componentContext.getProps();
        if (Object.keys(context.errorStack).length > 0) {
            return;
        }

        const responseData = context.output.data;
        if (ignoreSuccessState !== true && responseData.code !== 200) {
            const error = new Error(responseData.msg);
            error.responseData = responseData;
            throw error;
        }
        const output = ((output) => typeof transformData === 'function' ? transformData(output, context.outputStack['params']) : output)((ignoreSuccessState !== true ? responseData.results : responseData) || {});
        onRequestSuccess && onRequestSuccess(output);
        return output;
    }, dependencies: ['request']
};

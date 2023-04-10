export default {
    id: 'load-more', plugin: ({type, callback}, context) => {
        const {fetchData} = context.componentContext.getState();
        if (type === 'load-more' && typeof callback === 'function') {
            return callback(fetchData, context.output);
        }
    }, dependencies: ['output-data']
};

export default {
    id: 'load-more', plugin: ({type, callback}, context) => {
        if (type === 'load-more' && typeof callback === 'function') {
            const {fetchData} = context.componentContext.getState();
            return callback(fetchData, context.output);
        }
    }, dependencies: ['output-data']
};

export default {
    id: 'load-more',
    plugin: ({type, callback}, context) => {
        if (type === 'load-more' && typeof callback === 'function') {
            return callback(context.componentContext.data, context.output);
        }
    },
    dependencies: ['output-data']
};

export default {
    id: 'loader',
    plugin: async (props, context) => {
        const {loader} = context.componentContext.getProps();
        if (typeof loader === 'function') {
            const data = await loader(context.outputStack['params']);
            return {
                data: {
                    code: 200,
                    results: data
                }
            }
        }
    },
    dependencies: ['params']
};

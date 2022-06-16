import {globalParams} from '../preset';

export default {
    id: 'request',
    plugin: (props, context) => {
        if (context.outputStack['loader']) {
            return;
        }
        if (context.outputStack['cache']) {
            return context.outputStack['cache'];
        }
        context.componentContext.requestParams = context.outputStack['params'];
        context.componentContext.setRequestParams(context.outputStack['params']);
        return globalParams.ajax(context.outputStack['params']);
    },
    dependencies: ['params']
};

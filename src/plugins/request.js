import {globalParams} from '../preset';
import get from 'lodash/get';

export default {
    id: 'request',
    plugin: ({force}, context) => {
        if (context.outputStack['loader'] || context.errorStack['loader']) {
            return;
        }
        if (context.outputStack['cache']) {
            return context.outputStack['cache'];
        }
        const token = context.componentContext.getRequestToken();
        context.componentContext.requestParams = context.outputStack['params'];
        const {ajax} = context.componentContext.getProps();
        const requestPromise = force !== true && get(context.globalContext.pendingRequest, token) || (ajax || globalParams.ajax)(context.outputStack['params']);
        context.globalContext.pendingRequest = Object.assign({}, context.globalContext.pendingRequest, {[token]: requestPromise});
        return requestPromise.then((data) => {
            delete context.globalContext.pendingRequest[token];
            return data;
        });
    },
    dependencies: ['params']
};

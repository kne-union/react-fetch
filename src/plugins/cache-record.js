import {globalParams} from "../preset";

export default {
    id: 'cache-record',
    plugin: (props, context) => {
        const {isLocal, ttl} = context.componentContext.getProps();
        if (context.requestContext.cacheKey && context.outputStack['request']) {
            globalParams.cache.put(context.requestContext.cacheKey, context.outputStack['request'], {ttl, isLocal});
        }
    },
    dependencies: ['cache', 'request']
};

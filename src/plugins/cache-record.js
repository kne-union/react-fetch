import {globalParams} from "../preset";

export default {
    id: 'cache-record',
    plugin: (props, context) => {
        const {cache, isLocal, ttl} = context.componentContext.getProps();
        const token = context.componentContext.getRequestToken();
        const cacheKey = (cache === true ? '' : cache) + token;
        if (context.outputStack['request']) {
            globalParams.cache.put(cacheKey, context.outputStack['request'], {ttl, isLocal});
        }
    },
    dependencies: ['cache', 'request']
};

import {globalParams} from "../preset";

export default {
    id: 'cache-record',
    plugin: (props, context) => {
        const {cache, isLocal, ttl} = context.componentContext.getProps();
        const token = context.componentContext.getRequestToken();
        const cacheName = cache === true ? '' : cache;
        const cacheKey = cacheName + token;
        if (cache && context.outputStack['request'] && context.outputStack['output-data'] !== void (0)) {
            globalParams.cache.put(cacheKey, context.outputStack['request'], {ttl, isLocal, cacheName});
        }
    },
    dependencies: ['cache', 'request', 'output-data']
};

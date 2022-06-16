import objectHash from "object-hash";
import {globalParams} from "../preset";

export default {
    id: 'cache',
    plugin: ({force}, context) => {
        const {cache} = context.componentContext.getProps();
        if (force === true || !cache) {
            return;
        }
        const params = context.outputStack['params'];
        const cacheKey = (cache === true ? '' : cache) + objectHash(params, {
            algorithm: 'md5',
            encoding: 'base64'
        });
        context.requestContext.cacheKey = cacheKey;

        const cacheData = globalParams.cache.get(cacheKey);
        if (!cacheData) {
            return;
        }
        return Promise.resolve(cacheData);
    }
};

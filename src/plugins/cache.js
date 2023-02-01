import objectHash from "object-hash";
import {globalParams} from "../preset";

export default {
    id: 'cache',
    plugin: ({force}, context) => {
        const {cache} = context.componentContext.getProps();
        const token = context.componentContext.getRequestToken();
        if (force === true || !cache) {
            return;
        }

        const cacheKey = (cache === true ? '' : cache) + token;
        const cacheData = globalParams.cache.get(cacheKey);
        if (!cacheData) {
            return;
        }
        return Promise.resolve(cacheData);
    }
};

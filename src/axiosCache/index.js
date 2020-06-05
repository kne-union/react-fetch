import get from 'lodash/get';
import Cache from './cache.js'

export default function withAxios(instance, option) {
    const cacher = new Cache({});
    function axiosWithCache(...arg) {
        let allOptions = getCacheOption(...arg);
        cacher.setOptions(allOptions);
        // 校验参数中是否定义了cache属性
        let needCache = validNeedCache(...arg);
        if (needCache) {
            let config = arg[0];
            // 判断当前请求的缓存是否存在，存在返回缓存信息，不存在请求数据
            let cacheKey = cacher.buildUniqueKey(config)
            let responsePromise = null;
            if (cacher.hasCache(cacheKey)) {
                responsePromise = cacher.getCache(cacheKey).value;
                return responsePromise.then(response => {
                    responseJob(response, cacher, cacheKey);
                    return JSON.parse(JSON.stringify(response))
                });
            } else if (cacher.getStorage(cacheKey)) {
                let resultResponse = cacher.getStorage(cacheKey).value;
                return Promise.resolve(resultResponse).then(data => JSON.parse(JSON.stringify(data)));
            } else {
                responsePromise = (async () => {
                    try {
                        const response = await instance(...arg);
                        responseJob(response, cacher, cacheKey);
                        return Promise.resolve(response);
                    } catch (reason) {
                        cacher.removeCache(cacheKey)
                        cacher.removeStorageByKey(cacheKey)
                        return Promise.reject(reason)
                    }
                })()
                // 添加缓存, 为了并发多次请求的情况下，故添加内存的promise缓存
                cacher.setCache(cacheKey, responsePromise)
                // 添加定时器，时间到自动清除缓存
                if (cacher.options.expire && cacher.options.expire !== 0) {
                    setTimeout(() => {
                        console.log('cacher.expire---setTimeout', cacheKey)
                        cacher.removeCache(cacheKey)
                    }, cacher.options.expire)
                }
                if (cacher.options.storage_expire && cacher.options.storage_expire !== 0) {
                    setTimeout(() => {
                        console.log('cacher.storage_expire---setTimeout', cacheKey)
                        cacher.removeStorageByKey(cacheKey)
                    }, cacher.options.storage_expire)
                }
                return responsePromise.then(data => JSON.parse(JSON.stringify(data)));
            }
        } else {
            return instance(...arg);
        }
    }
    // 处理返回结果
    function responseJob(response, cacher, cacheKey) {
        const result = option.transformResponse(response);
        // 将正确的结果放入缓存中; 如果返回的结果不正确，则不进行缓存，并且清除内存中的Promise缓存
        if (result.data.code !== 200) {
            cacher.removeCache(cacheKey)
            cacher.removeStorageByKey(cacheKey)
        } else {
            // 如果启用本地缓存则将返回结果放入本地缓存中
            if (cacher.options.storage && cacher.options.storage === true) {
                cacher.setStorage(cacheKey, response)
            }
        }
    }
    // 校验是否需要缓存该请求
    function validNeedCache(...arg) {
        let needCache = false;
        if (arg.length === 1 && arg[0].hasOwnProperty('cache')) {
            let type = Object.prototype.toString.call(arg[0].cache);
            if (type === '[object Boolean]' && arg[0].cache === true) {
                needCache = true
            } else if (type === '[object Object]') {
                needCache = true
            }
        }
        return needCache;
    }
    // 获取参数中缓存的配置项
    function getCacheOption(...arg) {
        let toString = Object.prototype.toString;
        let option = {};
        // 默认如果有cache属性且是bool为true的类型或者对象类型则表示启用请求缓存，
        if (validNeedCache(...arg)) {
            let type = toString.call(arg[0].cache);
            if (type === '[object Object]') {
                if (arg[0].cache.hasOwnProperty('expire')) {
                    option['expire'] = get(arg[0].cache, 'expire')
                }
                if (arg[0].cache.hasOwnProperty('storage')) {
                    option['storage'] = get(arg[0].cache, 'storage')
                }
                if (arg[0].cache.hasOwnProperty('storage_expire')) {
                    option['storage_expire'] = get(arg[0].cache, 'storage_expire')
                }
                if (arg[0].cache.hasOwnProperty('max_cache_size')) {
                    option['max_cache_size'] = get(arg[0].cache, 'max_cache_size')
                }
            }
        }
        return option;
    }
    return axiosWithCache;
}
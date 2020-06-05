import get from 'lodash/get';
export default class Cache {
    constructor(options) {
        this.cacheMap = new Map();
        let defaults = {
            expire: 1000 * 60 * 5, // 过期时间  默认5分钟; 0:表示不过期
            storage: false, // 是否开启本地缓存
            storage_expire: 1000 * 60 * 5, // 本地缓存过期时间  默认一小时; 0:表示不过期
            max_cache_size: 15, // 指定最多可缓存的条目数，超过这个数量时最早的缓存会被删除，默认为 15
        };
        validateOptions(options);
        this.options = Object.assign(defaults, options);
    }
    // 设置缓存的值
    setOptions(options) {
        validateOptions(options);
        Object.assign(this.options, options);
    }
    // 清除本地缓存
    removeStorage() {
        localStorage.clear()
    }
    // 清除本地缓存
    removeStorageByKey(key) {
        localStorage.removeItem(key)
    }
    // 设置缓存
    setStorage(key, value) {
        // 清除过期缓存
        this.clearExpireCache();
        let expire = getExpireTime();
        // 如果启用本地缓存
        localStorage.setItem(key, JSON.stringify({
            expire,
            value
        }))
        // 校验本地现有缓存数量
        if (localStorage.length > this.options.max_cache_size && localStorage.length > 0) {
            // 移除最早的缓存
            let lastedKey = localStorage.key(0);
            this.removeStorageByKey(lastedKey);
        }
    }
    hasStorage(key) {
        this.clearExpireCache();
        return this.getStorage(key);
    }
    // 获取缓存
    getStorage(key) {
        let data = localStorage.getItem(key)
        return JSON.parse(data)
    }
    // 添加缓存
    setCache(key, value) {
        // 清除过期缓存
        this.clearExpireCache();
        let expire = getExpireTime();
        // 添加缓存
        this.cacheMap.set(key, {
            expire,
            value
        });
        // 校验现有缓存数量
        if (this.cacheMap.size > this.options.max_cache_size) {
            // 移除最早的缓存
            this.cacheMap.delete([...(this.cacheMap).keys()][0]);
        }
    }
    // 获取缓存
    getCache(key) {
        return this.cacheMap.get(key);
    }
    // 查看是否有该缓存
    hasCache(key) {
        this.clearExpireCache();
        return this.cacheMap.has(key);
    }
    // 删除缓存
    removeCache(key) {
        this.cacheMap.delete(key);
        this.removeStorageByKey(key);
    }
    // 清除过期缓存
    clearExpireCache() {
        let expire = getExpireTime();
        let arr_expire_keys = [];
        if (this.options.expire !== 0) {
            this.cacheMap.forEach((item, key, mapObj) => {
                if (expire - item.expire > this.options.expire) {
                    arr_expire_keys.push(key)
                }
            })
            // 清除内存中的过期缓存
            for (let i = 0; i < arr_expire_keys.length; i++) {
                this.cacheMap.delete(i)
            }
        }
        // 清除本地种的过期缓存
        if (this.options.storage_expire !== 0) {
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                let tempCache = this.getStorage(key);
                if (expire - tempCache.expire > this.options.storage_expire) {
                    this.removeStorageByKey(key);
                }
            }
        }
    }
    // 生成唯一的key
    buildUniqueKey(config) {
        const { url, params, method, data } = config;
        let keyUrl = url;
        const paramStr = (obj) => {
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                return JSON.stringify(Object.keys(obj).sort().reduce((result, key) => {
                    result[key] = obj[key]
                    return result
                }, {}))
            } else {
                return JSON.stringify(obj)
            }
        }
        keyUrl += `?${paramStr(params || {})}&${paramStr(data || {})}&${method}`;
        return keyUrl
    }
}
// 设置过期时间
function getExpireTime() {
    return new Date().getTime()
}
// 校验参数类型
function validateOptions(options) {
    const toString = Object.prototype.toString;
    if (toString.call(get(options, 'expire', 1000 * 60 * 5)) !== '[object Number]') {
        throw new Error('expire:应为数值类型')
    }
    if (toString.call(get(options, 'storage', false)) !== '[object Boolean]') {
        throw new Error('storage:应为布尔类型')
    }
    if (toString.call(get(options, 'storage_expire', 1000 * 60 * 5)) !== '[object Number]') {
        throw new Error('storage_expire:应为数值类型')
    }
    if (toString.call(get(options, 'max_cache_size', 15)) !== '[object Number]') {
        throw new Error('max_cache_size:应为数值类型')
    }
}


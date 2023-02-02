import Cache from './Cache';

export const globalParams = {
    cache: new Cache({ttl: 1000 * 60 * 10, maxLength: 1000, isLocal: true}), ajax: () => {
        throw new Error('默认的axios配置已经移除，请首先在preset里面配置');
    }, loading: null, error: null, empty: null, pagination: {
        initCurrent: 1, pageSize: 10, transform: (params) => params
    }, transformResponse: (response) => {
        const {data} = response;
        response.data = {
            code: data.code, msg: data.msg, results: data.results
        };
        return response;
    }
};

export const getCache = () => globalParams.cache;

export default (newOptions) => {
    return Object.assign(globalParams, newOptions);
};



import axios from 'axios';
import Cache from './Cache';

export const globalParams = {
    cache: new Cache({ttl: 1000 * 60 * 10, maxLength: 1000, isLocal: true}),
    ajax: axios.create(),
    createConfig: null,
    loading: null,
    error: null,
    empty: null,
    transformResponse: (response) => {
        const {data} = response;
        response.data = {
            code: data.code,
            msg: data.msg,
            results: data.results
        };
        return response;
    }
};

export default (newOptions) => {
    return Object.assign(globalParams, newOptions);
};



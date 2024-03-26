import merge from "lodash/merge";
import pick from 'lodash/pick';

export default {
    id: 'params', plugin: ({options, url, method, params, data}, context) => {
        const {options: componentOptions, urlParams, ...componentProps} = context.componentContext.getProps();
        const targetParams = merge({}, componentOptions, pick(componentProps, ['url', 'method', 'params', 'data']), options, {
            url, method, params, data, urlParams
        });

        const output = Object.assign({}, targetParams);
        if (typeof urlParams === 'object' && Object.keys(urlParams).length > 0 && typeof output.url === 'string') {
            output.url = output.url.replace(/{([\s\S]+?)}/g, (match, name) => {
                return urlParams.hasOwnProperty(name) ? urlParams[name] : match;
            });
        }

        context.componentContext.setRequestParams(targetParams);
        return output;
    }
};

import merge from "lodash/merge";
import pick from 'lodash/pick';

export default {
    id: 'params',
    plugin: ({options, url, method, params, data}, context) => {
        const {options: componentOptions, ...componentProps} = context.componentContext.getProps();
        const output = merge({}, componentOptions, pick(componentProps, ['url', 'method', 'params', 'data']), options, {
            url,
            method,
            params,
            data
        });
        context.componentContext.setRequestParams(output);
        return output;
    }
};

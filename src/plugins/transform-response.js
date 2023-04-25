import {globalParams} from "../preset";

export default {
    id: 'transform-response', plugin: (props, context) => {
        const {transformResponse, transformData} = context.componentContext.getProps();
        const response = context.outputStack['request'];
        if (!response) {
            return;
        }
        const output = (transformResponse || globalParams.transformResponse)(Object.assign({}, response));
        return typeof transformData === 'function' ? transformData(output) : output;
    }, dependencies: ['request']
};

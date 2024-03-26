import {globalParams} from "../preset";

export default {
    id: 'transform-response', plugin: (props, context) => {
        const {transformResponse, ignoreSuccessState, options} = context.componentContext.getProps();
        const response = context.outputStack['request'];
        if (!response) {
            return;
        }
        if (ignoreSuccessState === true) {
            return response;
        }
        return (transformResponse || globalParams.transformResponse)(Object.assign({}, response));
    }, dependencies: ['request']
};

import {globalParams} from "../preset";

export default {
    id: 'transform-response',
    plugin: (props, context) => {
        const {transformResponse} = context.componentContext.getProps();
        const response = context.outputStack['request'];
        if (!response) {
            return;
        }
        return (transformResponse || globalParams.transformResponse)(Object.assign({}, response));
    },
    dependencies: ['request']
};

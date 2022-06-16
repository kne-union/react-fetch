import {globalParams} from "../preset";

export default {
    id: 'transform-response',
    plugin: (props, context) => {
        const response = context.outputStack['request'];
        if (!response) {
            return;
        }
        return globalParams.transformResponse(Object.assign({}, response));
    },
    dependencies: ['request']
};

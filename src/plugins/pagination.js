import {globalParams} from '../preset';
import merge from 'lodash/merge';

export default {
    id: 'pagination',
    plugin: ({page, size}, context) => {
        const {updateType} = context.componentContext.getProps();
        if (updateType === 'nextPage') {
            const params = context.outputStack['params'];
            const paginationParams = globalParams.pagination.transform({
                page: page || globalParams.pagination.initCurrent,
                size: size || globalParams.pagination.pageSize
            });
            context.outputStack['params'] = merge({}, {
                params: paginationParams,
                data: paginationParams
            }, params);
        }
    },
    dependencies: ['params']
};

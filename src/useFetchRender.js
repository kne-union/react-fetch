import React from 'react';
import isFunction from "lodash/isFunction";

export default ({loading, empty, error, component, render, isLoading, isComplete, errorMsg, results, refresh, props}) => {
    if (isLoading) {
        return loading;
    }

    if (errorMsg !== undefined) {
        if (isFunction(error)) {
            return error(errorMsg);
        }
        return error;
    }

    if (!isComplete) {
        //防止isLoading初始化渲染
        return empty;
    }

    if (component) {
        const FetchComponent = component;
        return <FetchComponent {...props} data={results} refresh={refresh}/>;
    }

    if (render) {
        return render({...props, data: results, refresh});
    }

    throw new Error('请传入component参数或者render参数');
};

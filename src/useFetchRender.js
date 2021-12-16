import React from 'react';
import isFunction from "lodash/isFunction";

export default ({loading, empty, error, component, render, isLoading, isComplete, errorMsg, results, refresh, setData, props}) => {
    if (isLoading && loading !== false) {
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
        return <FetchComponent {...props} isLoading={isLoading} data={results} refresh={refresh} setData={setData}/>;
    }

    if (render) {
        return render({...props, isLoading, data: results, refresh, setData});
    }

    throw new Error('请传入component参数或者render参数');
};

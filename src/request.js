import {createRunner} from "./plugins";
import objectHash from "object-hash";
import pick from "lodash/pick";

const request = (props) => {
    const {
        onRequestParamsChange, onRequestDataChange, onError, onIsCompleteChange, onIsLoadingChange, ...requestProps
    } = Object.assign({}, props, {options: Object.assign({}, {ignoreSuccessState: true}, props?.options)});
    return createRunner({
        getProps: () => requestProps,
        getRequestToken: () => objectHash(pick(requestProps, ['url', 'params', 'method', 'data', 'options']), {
            algorithm: 'md5', encoding: 'base64'
        }),
        requestParams: {},
        setRequestParams: (...args) => onRequestParamsChange && onRequestParamsChange(...args),
        setFetchData: (...args) => onRequestDataChange && onRequestDataChange(...args),
        setError: (...args) => onError && onError(...args),
        setIsComplete: (...args) => onIsCompleteChange && onIsCompleteChange(...args),
        setIsLoading: (...args) => onIsLoadingChange && onIsLoadingChange(...args)
    })();
};

export default request;

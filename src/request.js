import {createRunner} from "./plugins";
import getRequestToken from './getRequestToken';

const request = (props) => {
    const {
        onRequestParamsChange, onRequestDataChange, onError, onIsCompleteChange, onIsLoadingChange, ...requestProps
    } = Object.assign({}, props, {options: Object.assign({}, props?.options)}, {
        type: 'refresh', ignoreSuccessState: true
    });
    return createRunner({
        getProps: () => requestProps,
        getRequestToken: () => getRequestToken(requestProps),
        requestParams: {},
        setRequestParams: (...args) => onRequestParamsChange && onRequestParamsChange(...args),
        setFetchData: (...args) => onRequestDataChange && onRequestDataChange(...args),
        setError: (...args) => onError && onError(...args),
        setIsComplete: (...args) => onIsCompleteChange && onIsCompleteChange(...args),
        setIsLoading: (...args) => onIsLoadingChange && onIsLoadingChange(...args)
    })({});
};

export default request;

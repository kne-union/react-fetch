import mergeWith from "lodash/mergeWith";
import pick from 'lodash/pick';

/** lodash.merge 会按 index 合并数组，[] 清不掉旧 ids；数组一律替换 */
const mergeReplaceArrays = (object, ...sources) =>
  mergeWith(object, ...sources, (objValue, srcValue) => {
    if (Array.isArray(srcValue)) {
      return srcValue.slice();
    }
  });

/** 去掉 null/undefined，避免 ids=null / filter[ids]=null 仍打到请求上 */
const pruneEmpty = value => {
  if (value == null) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value !== 'object') {
    return value;
  }
  const next = {};
  Object.keys(value).forEach(key => {
    const pruned = pruneEmpty(value[key]);
    if (pruned !== undefined) {
      next[key] = pruned;
    }
  });
  return next;
};

export default {
    id: 'params', plugin: ({options, url, method, params, data}, context) => {
        const {options: componentOptions, urlParams, ...componentProps} = context.componentContext.getProps();
        const targetParams = mergeReplaceArrays({}, componentOptions, pick(componentProps, ['url', 'method', 'params', 'data']), options, {
            url, method, params, data, urlParams
        });

        if (targetParams.params && typeof targetParams.params === 'object') {
            targetParams.params = pruneEmpty(targetParams.params) || {};
        }
        if (targetParams.data && typeof targetParams.data === 'object' && !Array.isArray(targetParams.data)) {
            targetParams.data = pruneEmpty(targetParams.data) || {};
        }

        const output = Object.assign({}, targetParams);
        if (typeof urlParams === 'object' && Object.keys(urlParams).length > 0 && typeof output.url === 'string') {
            output.url = output.url.replace(/{([\s\S]+?)}/g, (match, name) => {
                return urlParams.hasOwnProperty(name) ? urlParams[name] : match;
            });
        }

        context.componentContext.setRequestParams(targetParams);
        return output;
    }
};

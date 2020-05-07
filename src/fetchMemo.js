import memoize from "lodash/memoize";
import {globalParams} from "./preset";
import hash from "object-hash";

export default memoize(({url, options, data}) => {
  return globalParams.ajax({url, data, ...options});
}, (object, force) => {
  if (force === true) {
    return Symbol();
  }
  return hash(object);
});

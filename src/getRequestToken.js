import pick from "lodash/pick";
import objectHash from "object-hash";

const getRequestToken = (props) => objectHash(pick(props, ['url', 'params', 'method', 'data', 'urlParams', 'options']), {
    algorithm: 'md5', encoding: 'base64'
});

export default getRequestToken;

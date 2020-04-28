export default (list) => {
    if (list.length === 0) {
        return {};
    }

    const allKeys = Object.keys(Object.assign({}, ...list));

    const reduceCallback = (current, next, index) => {
        const obj = {};
        allKeys.forEach((key) => {
            if (key === 'code') {
                obj[key] = current[key];
            } else {
                if (index <= 1) {
                    obj[key] = [current[key]];
                } else {
                    obj[key] = current[key];
                }
                if (index > 0) {
                    obj[key].push(next[key]);
                }
            }
        });
        return obj;
    }

    if (list.length === 1) {
        return reduceCallback(list[0], null, 0);
    }

    return list.reduce(reduceCallback);
};

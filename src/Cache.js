class Cache {
    static KEY_NAME = 'REACT_FETCH_CACHE';

    static now() {
        return (new Date()).getTime();
    }

    constructor(options) {
        const {ttl, maxLength, isLocal, localName} = Object.assign({}, options);
        this.ttl = ttl || 0;
        this.data = {};
        this.maxLength = maxLength || 1000;
        this.isLocal = localName ? true : isLocal;
        this.localName = localName;
        this._load();
    }

    _load() {
        if (!this.isLocal) {
            return;
        }
        try {
            const dataString = window.localStorage && window.localStorage.getItem(this.localName || Cache.KEY_NAME);
            if (!dataString) {
                return;
            }

            const dataObj = JSON.parse(dataString);
            Object.keys(dataObj).forEach((key) => {
                dataObj[key].isLocal = true;
            });
            this.data = dataObj;
        } catch (e) {
        }
    }

    _save() {
        if (!this.isLocal) {
            return;
        }
        const keys = Object.keys(this.data);
        Promise.all(keys.map((key) => this.data[key].value)).then((data) => {
            const output = {};
            keys.forEach((key, index) => {
                const {isLocal, ...props} = this.data[key];
                if (isLocal === true) {
                    output[key] = Object.assign({}, props, {value: data[index]});
                }
            });
            window.localStorage && window.localStorage.setItem(this.localName || Cache.KEY_NAME, JSON.stringify(output));
        });
    }

    get(key) {
        const obj = this.data[key];
        let val = null;
        if (obj) {
            val = obj.value;
            if (obj.expires && Cache.now() >= obj.expires) {
                val = null
                delete this.data[key];
            }
        }
        this._save();
        return val;
    }

    del(key) {
        const oldValue = this.get(key);
        delete this.data[key];
        this._save();
        return oldValue;
    }

    put(key, val, options) {
        let {ttl, isLocal} = options;
        if (ttl === undefined) {
            ttl = this.ttl;
        }
        let oldValue = this.del(key);
        if (val !== null) {
            const keys = Object.keys(this.data);
            if (keys.length >= this.maxLength) {
                const delKey = keys.sort((a, b) => {
                    return this.data[a].createTime - this.data[b].createTime;
                })[0];
                delete this.data[delKey];
            }
            const now = Cache.now();
            this.data[key] = {expires: ttl === 0 ? null : now + ttl, value: val, createTime: now, isLocal};
        }
        this._save();
        return oldValue;
    }

    clean() {
        this.data = {};
        this._save();
    }
}

export default Cache;

#### Fetch

| 属性名       | 说明                                                                         | 类型           | 默认值  |
|-----------|----------------------------------------------------------------------------|--------------|------|
| url       | 需要请求接口的url                                                                 | string       | -    |
| data      | POST请求的data                                                                | obj          | -    |
| params    | GET请求的query                                                                |obj|-|
| options   | 请求的其他参数，如method,headers等，详细请参考[axios](https://github.com/axios/axios)      | -            |
| loading   | 在请求发出后没有返回结果时渲染的组件                                                         | jsx          | null |
| error     | 请求返回后code不为200时渲染的组件，如果传入函数，参数中会接收到请求返回的错误msg                              | jsx&#124;func | null |
| empty     | 请求未发出时渲染的组件                                                                | jsx          | null |
| isEmpty   | 判断响应数据是否是空状态                                                               | bool         | -    |
| auto      | 是否自动发送请求，如果为false需要手动调用refresh方法才会发送请求，并且url,data,options发生变化后不会自动发送新的请求   | bool         | true |
| component | 请求返回成功时需要渲染的组件                                                             | React Component | -    |
| render    | 请求返回成功时执行的方法，改方法需要返回jsx，参数可以拿到{data,refresh,setData}，当存在component时改方法不会被执行 | func         | -    |

#### withFetch

高阶组件 Fetch组件的封装 withFetch(WrappedComponent) WrappedComponent为一个React Component,等价于给Fetch传入component参数

#### createWithFetch

withFetch的高阶函数，可以将部分参数提前传入，不必在调用withFetch(WrappedComponent) 时再传入参数

#### useFetch

React Hooks

参数 useFetch(options)

options:

|属性名|说明| 类型     |默认值|
|  ---  | ---  |--------| --- |
|url|需要请求接口的url| string |- |
|data|POST请求的data| obj    | - |
| params    | GET请求的query                                                               | obj    |-|
|options|请求的其他参数，如method,headers等，详细请参考[axios](https://github.com/axios/axios)| obj    | - |
|auto|是否自动发送请求，如果为false需要手动调用refresh方法才会发送请求，并且url,data,options发生变化后不会自动发送新的请求| bool   |true|

返回值

| 属性名        | 说明                                                                                                                              |类型|
|------------|---------------------------------------------------------------------------------------------------------------------------------| --- |
| isLoading  | 当前fetch组件是否正在加载                                                                                                                 |bool|
| isComplete | 当前fetch组件是否已完成                                                                                                                  |bool|
| error      | 当前组件的请求错误信息                                                                                                                     |bool|
| data       | 当前组件的请求返回数据                                                                                                                     |-|
| refresh    | 可以调用它手动重新发送请求的方法                                                                                                                |func|
| reload     | 可以调用它手动重新发送请求的方法和refresh的差异在于，reload在请求响应返回之前不会写在掉当前页面，当请求响应返回后对内层组件做数据更新操作，refresh则会在请求发送后切换到loading状态，请求响应返回后内层组件走重新install操作 |func|
| setData    | 可以调用它给fetch中保存值的state赋值                                                                                                         |func|
|requestParams| 当前请求的实际参数                                                                                                                       |obj|-|

#### preset 预制设置的方法 preset(options)

options

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|ajax|axios实例|obj|-|
|loading|在请求发出后没有返回结果时渲染的组件|jsx|null|
|error|请求返回后code不为200时渲染的组件，如果传入函数，参数中会接收到请求返回的错误msg|jsx&#124;func|null|
|empty|请求未发出时渲染的组件|jsx|null|
|transformResponse|请求转换器，参数为response返回值为response需要在此方法将请求返回结果转换成规定的格式|func|-|

#### 缓存接口的应用

Fetch options

| 属性名     | 说明                                                                | 类型          | 默认值 |
|---------|-------------------------------------------------------------------|-------------|-----|
| cache为  | true或者为字符串的时候为开启缓存，如果请求参数完全一致则命中缓存。如果cache为字符串，只有cahce一致的组件之间会命中缓存 | bool,string | -   |
| ttl     | 缓存失效时间，为0的时候不失效，单位为毫秒                                             | number      | 0   |
| isLocal | 缓存是否存储到localStorge                                                |bool|false|

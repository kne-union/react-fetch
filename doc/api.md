#### Fetch

| 属性名               | 说明                                                                                                                                                                     | 类型                | 默认值  |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|------|
| url               | 需要请求接口的url                                                                                                                                                             | string            | -    |
| data              | POST请求的data                                                                                                                                                            | object            | -    |
| params            | GET请求的query                                                                                                                                                            | object            | -    |
| options           | 请求的其他参数，如method,headers等，详细请参考[axios](https://github.com/axios/axios)                                                                                                  | -                 |
| loading           | 在请求发出后没有返回结果时渲染的组件                                                                                                                                                     | jsx               | null |
| error             | 请求返回后code不为200时渲染的组件，如果传入函数，参数中会接收到请求返回的错误msg                                                                                                                          | jsx&#124;function | null |
| empty             | 请求未发出时渲染的组件                                                                                                                                                            | jsx               | null |
| isEmpty           | 判断响应数据是否是空状态                                                                                                                                                           | boolean           | -    |
| auto              | 是否自动发送请求，如果为false需要手动调用refresh方法才会发送请求，并且url,data,options发生变化后不会自动发送新的请求                                                                                               | bool              | true |
| component         | 请求返回成功时需要渲染的组件                                                                                                                                                         | jsx               | -    |
| render            | 请求返回成功时执行的方法，改方法需要返回jsx，参数可以拿到{data,refresh,setData}，当存在component时改方法不会被执行                                                                                             | function          | -    |
| loader            | 当该参数存在时，组件会优先执行loader去获取数据，而不会用ajax去发送请求，注意其请求的返回结果页不会transformResponse转换，也不会通过结果的code去判断请求是否成功，如果loader返回的Promise为resolve就判定为请求成功。其返回数据也会原样传给组件的data不会再data.results取值 | function          | -    |
| ajax              | 通常情况下你不需要传入这个参数,该参数默认取preset中的ajax。当你需要一个完全不同于全局的ajax发送请求的时候可以通过该参数为此组件设置一个新的ajax对象                                                                                    | axios object      | -    |
| transformResponse | 通常情况下你不需要传入这个参数,该参数默认取preset中的transformResponse。当你需要一个完全不同于全局的响应数据转换器的时候可以通过该参数为此组件设置                                                                                  | function          | -    |
| transformData     | 转换data返回值函数，它在拿到transformResponse返回结果之后执行                                                                                                                              | function          | -    |

#### withFetch

高阶组件 Fetch组件的封装 withFetch(WrappedComponent) WrappedComponent为一个React Component,等价于给Fetch传入component参数

#### createWithFetch

withFetch的高阶函数，可以将部分参数提前传入，不必在调用withFetch(WrappedComponent) 时再传入参数

#### useFetch

React Hooks

参数 useFetch(options)

options:

| 属性名                | 说明                                                                         | 类型       | 默认值   |
|--------------------|----------------------------------------------------------------------------|----------|-------|
| url                | 需要请求接口的url                                                                 | string   | -     |
| data               | POST请求的data                                                                | object   | -     |
| params             | GET请求的query                                                                | object   | -     |
| options            | 请求的其他参数，如method,headers等，详细请参考[axios](https://github.com/axios/axios)      | object   | -     |
| urlParams          | url模板参数,当url为 /example/{id}且传入urlParams为{id:123},真正发出请求的url为: /example/123 | object   | -     |
| ignoreSuccessState | 当且仅当该参数为true时在output阶段不再判断返回数据的code===200为请求成功，且返回data不再取results而是返回data本身 | boolean  | -     |
| auto               | 是否自动发送请求，如果为false需要手动调用refresh方法才会发送请求，并且url,data,options发生变化后不会自动发送新的请求   | boolean  | true  |
| debug              | 是否开启调试，开启以后可以在控制台打印整个组件的plugin执行堆栈，可以帮助排查问题                                | boolean  | false |
| onRequestStart     | 请求开始时回调方法                                                                  | function | -     |
| onRequestError     | 请求发生错误时回调方法                                                                | function | -     |
| onRequestSuccess   | 请求成功时回调方法                                                                  | function | -     |
| onRequestComplete  | 请求完成时（包括成功和失败）的回调方法                                                        | function | -     |

返回值

| 属性名           | 说明                                                                                                                                          | 类型       |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------|----------|
| isLoading     | 当前fetch组件是否正在加载                                                                                                                             | boolean  |
| isComplete    | 当前fetch组件是否已完成                                                                                                                              | boolean  |
| error         | 当前组件的请求错误信息                                                                                                                                 | boolean  |
| data          | 当前组件的请求返回数据                                                                                                                                 | -        |
| refresh       | 可以调用它手动重新发送请求的方法                                                                                                                            | function |
| reload        | 可以调用它手动重新发送请求的方法和refresh的差异在于，reload在请求响应返回之前不会写在掉当前页面，当请求响应返回后对内层组件做数据更新操作，refresh则会在请求发送后切换到loading状态，请求响应返回后内层组件走重新install操作             | func     |
| setData       | 可以调用它给fetch中保存值的state赋值                                                                                                                     | function |
| requestParams | 当前请求的实际参数                                                                                                                                   | object   |-|
| fetchProps    | Fetch组件接受到的请求参数,它和requestParams的区别在于，只有当Fetch的参数发生修改fetchProps的值会修改，通过send，reload,refresh修改请求参数，fetchProps的值不会修改，requestParams却始终时实际发送请求的参数 | object   |-|

#### preset 预制设置的方法 preset(options)

options

| 属性名               | 说明                                                 | 类型                | 默认值  |
|-------------------|----------------------------------------------------|-------------------|------|
| ajax              | axios实例                                            | object            | -    |
| loading           | 在请求发出后没有返回结果时渲染的组件                                 | jsx               | null |
| error             | 请求返回后code不为200时渲染的组件，如果传入函数，参数中会接收到请求返回的错误msg      | jsx&#124;function | null |
| empty             | 请求未发出时渲染的组件                                        | jsx               | null |
| transformResponse | 请求转换器，参数为response返回值为response需要在此方法将请求返回结果转换成规定的格式 | function          | -    |

#### 缓存接口的应用

Fetch options

| 属性名     | 说明                                                                  | 类型                  | 默认值   |
|---------|---------------------------------------------------------------------|---------------------|-------|
| cache   | 为true或者为字符串的时候为开启缓存，如果请求参数完全一致则命中缓存。如果cache为字符串，只有cahce一致的组件之间会命中缓存 | boolean&#124;string | -     |
| ttl     | 缓存失效时间，为0的时候不失效，单位为毫秒                                               | number              | 0     |
| isLocal | 缓存是否存储到localStorge                                                  | bool                | false |

### request

导出一个行为，参数和Fetch一致的方法，调用后发送一个ajax请求

使用方法

```js
request(props)
```

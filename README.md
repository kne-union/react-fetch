# ReactFetch
用于获取数据的react组件

```shell script
npm i @kne/react-fetch
```

# 使用示例
```jsx
import Fetch,{
  useFetch,
  useFetchAll,
  withFetch,
  withFetchAll,
  createWithFetch,
  createWithFetchAll,
  preset
} from '@kne/react-fetch'

const RenderComponent = ({data,refresh})=>{
    //当请求返回正常，可以拿到data值
};
React.render(
  <Fetch url="/api/***" 
         data={{...}} 
         options={{method:"POST",headers:{....}}} 
         component={RenderComponent}/>
  ,root);

const FetchRenderComponent = withFetch(RenderComponent);

React.render(
  <FetchRenderComponent 
       url="/api/***" 
       data={{...}} 
       options={{method:"POST",headers:{....}}} 
       component={RenderComponent}/>
   , root);

React.render(
  <FetchAll 
      fetchers={[{url:'api1',data:{...},options:{...},{url:'api2',data:{...},options:{...}]} 
      component={RenderComponent}/>
  ,root);

const FetchAllRenderComponent = withFetchAll(RenderComponent);

React.render(
  <FetchAllRenderComponent 
      fetchers={[{url:'api1',data:{...},options:{...},{url:'api2',data:{...},options:{...}]} 
      component={RenderComponent}/>
  ,root);

const CreateFetch = createWithFetch({url:'/api',data:{...}})(RenderComponent);

React.render(<CreateFetch/>,root);

const CreateFetchAll = createWithFetchAll({
  fetchers:[
    {url:'/api',data:{...}},  
    {url:'/api2',data:{...}},  
    {url:'/api3',data:{...}}
  ]
}
})(RenderComponent);

React.render(<CreateFetchAll/>,root);

// 缓存的使用
<Fetch url="/api" options={{ method: 'POST', cache: { 
  storage: true, 
  expire: 120000, 
  storage_expire: 60000, 
  max_cache_size: 20} }} component={RenderComponent} />

<Fetch url="/api" options={{ method: 'POST', cache: true }} component={RenderComponent} />

<FetchAll
  fetchers={[
    { url: '/api1', options:{ method: 'POST', cache: true } },
    { url: '/api2', options:{ method: 'POST', cache: true } }
  ]}
  component={RenderComponent} />
  
```
# preset使用示例
```jsx
import axios from 'axios';
import { preset as fetchReset } from '@kne/react-fetch';

const ajax = axios.create();

fetchReset({
  loading: <Spin/>, 
  error:(msg)=><span>{msg}</span>,
  ajax,
  transformResponse: (response) => {
    const { data } = response;
    response.data = {
      code: data.code,
      msg: data.msg,
      results: data.results
    };
    return response;
  }
});
```
> 注意：react-fetch 内部处理请求的时候只通过 code,msg,results来作为内部逻辑，code为200判定为请求成功，不为200时判定为错误，msg会传入到error组件，拿到results后，会将results作为业务组件的data属性  
> 如果后端的返回不满足上诉格式，需要在preset的transformResponse方法做转换适配  
> ajax为一个axios实例，每个实例的拦截器可能不同，默认会在内部自动创建一个axios实例，但是没有任何拦截器，如果想给其添加拦截器，可以自行创建axios实例通过preset设置  
> preset 可以单独放一个文件里，在入口文件顶部引入
# 使用说明

* 该组件处理了数据请求的逻辑，在数据请求返回之前会渲染一个loading组件，在请求数据返回之后渲染业务组件

* 在url，data，options其中之一发生改变的时候，组件会自动发出一个新的请求去请求数据

* 可以传入多个请求，并发发送，在所有请求成功后渲染业务组件，当某一个请求的参数发生变化，单独发送这一个请求成功后渲染业务组件

* 底层采用 [axios](https://github.com/axios/axios) 易于扩展

* 用preset预制设置，全局生效，不用在每次调用都设置一些通用属性

# API

#### Fetch

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|url|需要请求接口的url|string|- |
|data|POST请求的data|obj| - |
|options|请求的其他参数，如method,headers等，详细请参考[axios](https://github.com/axios/axios)| - |
|loading|在请求发出后没有返回结果时渲染的组件|jsx|null|
|error|请求返回后code不为200时渲染的组件，如果传入函数，参数中会接收到请求返回的错误msg|jsx&#124;func|null|
|empty|请求未发出时渲染的组件|jsx|null|
|auto|是否自动发送请求，如果为false需要手动调用refresh方法才会发送请求，并且url,data,options发生变化后不会自动发送新的请求|bool|true|
|component|请求返回成功时需要渲染的组件|React Component|-|
|render|请求返回成功时执行的方法，改方法需要返回jsx，参数可以拿到{data,refresh,setData}，当存在component时改方法不会被执行|func|-|

#### FetchAll

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|fetchers|需要请求的请求数组，数组中的每一项包含url,data,options,参考Fetch的url,data,options参数|array| - |
|loading|在请求发出后没有返回结果时渲染的组件|jsx|null|
|error|请求返回后code不为200时渲染的组件，如果传入函数，参数中会接收到请求返回的错误msg|jsx&#124;func|null|
|empty|请求未发出时渲染的组件|jsx|null|
|auto|是否自动发送请求，如果为false需要手动调用refresh方法才会发送请求，并且url,data,options发生变化后不会自动发送新的请求|bool|true|
|component|请求返回成功时需要渲染的组件|React Component|-|
|render|请求返回成功时执行的方法，改方法需要返回jsx，参数可以拿到{data,refresh,setData}，当存在component时改方法不会被执行|func|-|

#### withFetch 

高阶组件 Fetch组件的封装 withFetch(WrappedComponent) WrappedComponent为一个React Component,等价于给Fetch传入component参数

#### withFetchAll 

高阶组件 FetchAll组件的封装 withFetchAll(WrappedComponent) WrappedComponent为一个React Component,等价于给FetchAll传入component参数

#### createWithFetch 

withFetch的高阶函数，可以将部分参数提前传入，不必在调用withFetch(WrappedComponent) 时再传入参数

#### createWithFetchAll 

withFetchAll的高阶函数，可以将部分参数提前传入，不必在调用withFetchAll(WrappedComponent) 时再传入参数

#### useFetch 

React Hooks 

参数 useFetch(options)

options:

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|url|需要请求接口的url|string|- |
|data|POST请求的data|obj| - |
|options|请求的其他参数，如method,headers等，详细请参考[axios](https://github.com/axios/axios)｜obj| - |
|auto|是否自动发送请求，如果为false需要手动调用refresh方法才会发送请求，并且url,data,options发生变化后不会自动发送新的请求|bool|true|

返回值 {isLoading, isComplete, errorMsg, results, refresh,setData}

|属性名|说明|类型|
| --- | --- | --- |
|isLoading|当前fetch组件是否正在加载|bool|
|isComplete|当前fetch组件是否已完成|bool|
|errorMsg|当前组件的请求错误信息|bool|
|results|当前组件的请求返回数据|-|
|refresh|可以调用它手动重新发送请求的方法|func|
|setData|可以调用它给fetch中保存值的state赋值|func|

#### useFetchAll 

React Hooks 

参数 useFetchAll(options)

options:

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|fetchers|需要请求的请求数组，数组中的每一项包含url,data,options,参考Fetch的url,data,options参数|array| - |
|auto|是否自动发送请求，如果为false需要手动调用refresh方法才会发送请求，并且url,data,options发生变化后不会自动发送新的请求|bool|true|

返回值 {isLoading, isComplete, errorMsg, results, refresh,setData}

|属性名|说明|类型|
| --- | --- | --- |
|isLoading|当前fetch组件是否正在加载|bool|
|isComplete|当前fetch组件是否已完成|bool|
|errorMsg|当前组件的请求错误信息|bool|
|results|当前组件的请求返回数据|-|
|refresh|可以调用它手动重新发送请求的方法|func|
|setData|可以调用它给fetch中保存值的state赋值|func|

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

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
|cache|1、cache为bool类型，例如：<br>cache: true则启用内存内存缓存；<br>2、cache为对象类型，例如<br>cache:{<br>&nbsp;&nbsp;expire: 1000 * 60 * 5, // 过期时间  默认5分钟; 0:表示不过期 <br>&nbsp;&nbsp;storage: false, // 是否开启本地缓存<br>&nbsp;&nbsp;storage_expire: 1000 * 60 * 5, // 本地缓存过期时间  默认5分钟; 0:表示不过期<br>&nbsp;&nbsp; max_cache_size: 15<br>}|bool,object|-|
### change log:

2020.04.28 v0.1.6 添加了fetchAll等系列API以支持多接口并发请求
2020.05.25 v0.1.9 添加了setData，用于给state赋值

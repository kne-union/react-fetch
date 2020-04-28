# ReactFetch
用于获取数据的react组件

```shell script
npm i @kne/react-fetch
```

# 使用示例
```jsx
import Fetch,{useFetch,useFetchAll,withFetch,withFetchAll,createWithFetch,createWithFetchAll,preset} from '@kne/react-fetch'

const RenderComponent = ({data,refresh})=>{
    //当请求返回正常，可以拿到data值
};
React.render(<Fetch url="/api/***" data={{...}} options={{method:"POST",headers:{....}}} component={RenderComponent}/>,root);

const FetchRenderComponent = withFetch(RenderComponent);

React.render(<FetchRenderComponent url="/api/***" data={{...}} options={{method:"POST",headers:{....}}} component={RenderComponent}/>, root);

React.render(<FetchAll fetchers={[{url:'api1',data:{...},options:{...},{url:'api2',data:{...},options:{...}]} component={RenderComponent}/>,root);

const FetchAllRenderComponent = withFetchAll(RenderComponent);

React.render(<FetchAllRenderComponent fetchers={[{url:'api1',data:{...},options:{...},{url:'api2',data:{...},options:{...}]} component={RenderComponent}/>,root);

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

# 使用说明

* 该组件处理了数据请求的逻辑，在数据请求返回之前会渲染一个loading组件，在请求数据返回之后渲染业务组件

* 在url，data，options其中之一发生改变的时候，组件会自动发出一个新的请求去请求数据

* 可以传入多个请求，并发发送，在所有请求成功后渲染业务组件，当某一个请求的参数发生变化，单独发送这一个请求成功后渲染业务组件

* 底层采用 [axios](https://github.com/axios/axios) 易于扩展

* 用preset预制设置，全局生效，不用在每次调用都设置一些通用属性

# API



### change log:

2020.04.28 v0.1.6 添加了fetchAll等系列API以支持多接口并发请求

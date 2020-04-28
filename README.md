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

# API



### change log:

2020.04.28 v0.1.6 添加了fetchAll等系列API以支持多接口并发请求

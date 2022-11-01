import * as component_91 from '@kne/react-fetch';
import * as component_92 from 'antd/lib/input';
import * as component_93 from 'antd/lib/spin';
import * as component_94 from 'antd/lib/empty';
import * as component_95 from 'antd/lib/result';
import * as component_96 from 'antd/lib/space';
import * as component_97 from 'lodash';
import * as component_98 from 'antd/lib/list';
import * as component_99 from 'antd/lib/button';
import * as component_100 from 'antd/lib/pagination';
const readmeConfig = {
    name: `@kne/react-fetch`,
    description: `用于获取数据的react组件`,
    summary: `<ul>
<li>
<p>该组件处理了数据请求的逻辑，在数据请求返回之前会渲染一个loading组件，在请求数据返回之后渲染业务组件</p>
</li>
<li>
<p>在url，data，options其中之一发生改变的时候，组件会自动发出一个新的请求去请求数据</p>
</li>
<li>
<p>底层采用 <a href="https://github.com/axios/axios">axios</a> 易于扩展</p>
</li>
<li>
<p>插件式设计，方便追踪每一步的调用堆栈信息，易于扩展</p>
</li>
<li>
<p>用preset预制设置，全局生效，不用在每次调用都设置一些通用属性</p>
</li>
</ul>`,
    api: `<h4>Fetch</h4>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>url</td>
<td>需要请求接口的url</td>
<td>string</td>
<td>-</td>
</tr>
<tr>
<td>data</td>
<td>POST请求的data</td>
<td>object</td>
<td>-</td>
</tr>
<tr>
<td>params</td>
<td>GET请求的query</td>
<td>object</td>
<td>-</td>
</tr>
<tr>
<td>options</td>
<td>请求的其他参数，如method,headers等，详细请参考<a href="https://github.com/axios/axios">axios</a></td>
<td>-</td>
<td></td>
</tr>
<tr>
<td>loading</td>
<td>在请求发出后没有返回结果时渲染的组件</td>
<td>jsx</td>
<td>null</td>
</tr>
<tr>
<td>error</td>
<td>请求返回后code不为200时渲染的组件，如果传入函数，参数中会接收到请求返回的错误msg</td>
<td>jsx|function</td>
<td>null</td>
</tr>
<tr>
<td>empty</td>
<td>请求未发出时渲染的组件</td>
<td>jsx</td>
<td>null</td>
</tr>
<tr>
<td>isEmpty</td>
<td>判断响应数据是否是空状态</td>
<td>boolean</td>
<td>-</td>
</tr>
<tr>
<td>auto</td>
<td>是否自动发送请求，如果为false需要手动调用refresh方法才会发送请求，并且url,data,options发生变化后不会自动发送新的请求</td>
<td>bool</td>
<td>true</td>
</tr>
<tr>
<td>component</td>
<td>请求返回成功时需要渲染的组件</td>
<td>jsx</td>
<td>-</td>
</tr>
<tr>
<td>render</td>
<td>请求返回成功时执行的方法，改方法需要返回jsx，参数可以拿到{data,refresh,setData}，当存在component时改方法不会被执行</td>
<td>function</td>
<td>-</td>
</tr>
<tr>
<td>loader</td>
<td>当该参数存在时，组件会优先执行loader去获取数据，而不会用ajax去发送请求，注意其请求的返回结果页不会transformResponse转换，也不会通过结果的code去判断请求是否成功，如果loader返回的Promise为resolve就判定为请求成功。其返回数据也会原样传给组件的data不会再data.results取值</td>
<td>function</td>
<td>-</td>
</tr>
<tr>
<td>ajax</td>
<td>通常情况下你不需要传入这个参数,该参数默认取preset中的ajax。当你需要一个完全不同于全局的ajax发送请求的时候可以通过该参数为此组件设置一个新的ajax对象</td>
<td>axios object</td>
<td>-</td>
</tr>
<tr>
<td>transformResponse</td>
<td>通常情况下你不需要传入这个参数,该参数默认取preset中的transformResponse。当你需要一个完全不同于全局的响应数据转换器的时候可以通过该参数为此组件设置</td>
<td>function</td>
<td>-</td>
</tr>
</tbody>
</table>
<h4>withFetch</h4>
<p>高阶组件 Fetch组件的封装 withFetch(WrappedComponent) WrappedComponent为一个React Component,等价于给Fetch传入component参数</p>
<h4>createWithFetch</h4>
<p>withFetch的高阶函数，可以将部分参数提前传入，不必在调用withFetch(WrappedComponent) 时再传入参数</p>
<h4>useFetch</h4>
<p>React Hooks</p>
<p>参数 useFetch(options)</p>
<p>options:</p>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>url</td>
<td>需要请求接口的url</td>
<td>string</td>
<td>-</td>
</tr>
<tr>
<td>data</td>
<td>POST请求的data</td>
<td>object</td>
<td>-</td>
</tr>
<tr>
<td>params</td>
<td>GET请求的query</td>
<td>object</td>
<td>-</td>
</tr>
<tr>
<td>options</td>
<td>请求的其他参数，如method,headers等，详细请参考<a href="https://github.com/axios/axios">axios</a></td>
<td>object</td>
<td>-</td>
</tr>
<tr>
<td>auto</td>
<td>是否自动发送请求，如果为false需要手动调用refresh方法才会发送请求，并且url,data,options发生变化后不会自动发送新的请求</td>
<td>boolean</td>
<td>true</td>
</tr>
<tr>
<td>debug</td>
<td>是否开启调试，开启以后可以在控制台打印整个组件的plugin执行堆栈，可以帮助排查问题</td>
<td>boolean</td>
<td>false</td>
</tr>
<tr>
<td>onRequestStart</td>
<td>请求开始时回调方法</td>
<td>function</td>
<td>-</td>
</tr>
<tr>
<td>onRequestError</td>
<td>请求发生错误时回调方法</td>
<td>function</td>
<td>-</td>
</tr>
<tr>
<td>onRequestSuccess</td>
<td>请求成功时回调方法</td>
<td>function</td>
<td>-</td>
</tr>
<tr>
<td>onRequestComplete</td>
<td>请求完成时（包括成功和失败）的回调方法</td>
<td>function</td>
<td>-</td>
</tr>
</tbody>
</table>
<p>返回值</p>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
</tr>
</thead>
<tbody>
<tr>
<td>isLoading</td>
<td>当前fetch组件是否正在加载</td>
<td>boolean</td>
</tr>
<tr>
<td>isComplete</td>
<td>当前fetch组件是否已完成</td>
<td>boolean</td>
</tr>
<tr>
<td>error</td>
<td>当前组件的请求错误信息</td>
<td>boolean</td>
</tr>
<tr>
<td>data</td>
<td>当前组件的请求返回数据</td>
<td>-</td>
</tr>
<tr>
<td>refresh</td>
<td>可以调用它手动重新发送请求的方法</td>
<td>function</td>
</tr>
<tr>
<td>reload</td>
<td>可以调用它手动重新发送请求的方法和refresh的差异在于，reload在请求响应返回之前不会写在掉当前页面，当请求响应返回后对内层组件做数据更新操作，refresh则会在请求发送后切换到loading状态，请求响应返回后内层组件走重新install操作</td>
<td>func</td>
</tr>
<tr>
<td>setData</td>
<td>可以调用它给fetch中保存值的state赋值</td>
<td>function</td>
</tr>
<tr>
<td>requestParams</td>
<td>当前请求的实际参数</td>
<td>object</td>
</tr>
<tr>
<td>fetchProps</td>
<td>Fetch组件接受到的请求参数,它和requestParams的区别在于，只有当Fetch的参数发生修改fetchProps的值会修改，通过send，reload,refresh修改请求参数，fetchProps的值不会修改，requestParams却始终时实际发送请求的参数</td>
<td>object</td>
</tr>
</tbody>
</table>
<h4>preset 预制设置的方法 preset(options)</h4>
<p>options</p>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>ajax</td>
<td>axios实例</td>
<td>object</td>
<td>-</td>
</tr>
<tr>
<td>loading</td>
<td>在请求发出后没有返回结果时渲染的组件</td>
<td>jsx</td>
<td>null</td>
</tr>
<tr>
<td>error</td>
<td>请求返回后code不为200时渲染的组件，如果传入函数，参数中会接收到请求返回的错误msg</td>
<td>jsx|function</td>
<td>null</td>
</tr>
<tr>
<td>empty</td>
<td>请求未发出时渲染的组件</td>
<td>jsx</td>
<td>null</td>
</tr>
<tr>
<td>transformResponse</td>
<td>请求转换器，参数为response返回值为response需要在此方法将请求返回结果转换成规定的格式</td>
<td>function</td>
<td>-</td>
</tr>
</tbody>
</table>
<h4>缓存接口的应用</h4>
<p>Fetch options</p>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>cache</td>
<td>为true或者为字符串的时候为开启缓存，如果请求参数完全一致则命中缓存。如果cache为字符串，只有cahce一致的组件之间会命中缓存</td>
<td>boolean|string</td>
<td>-</td>
</tr>
<tr>
<td>ttl</td>
<td>缓存失效时间，为0的时候不失效，单位为毫秒</td>
<td>number</td>
<td>0</td>
</tr>
<tr>
<td>isLocal</td>
<td>缓存是否存储到localStorge</td>
<td>bool</td>
<td>false</td>
</tr>
</tbody>
</table>`,
    example: {
        isFull: false,
        className: `react_fetch_6e9ee`,
        style: `.react_fetch_6e9ee .ant-space-vertical {
  width: 100%; }

.react_fetch_6e9ee .load-container {
  height: 300px;
  overflow: auto; }

.react_fetch_6e9ee .scroller-no-more {
  text-align: center; }
`,
        list: [{
    title: `preset设置`,
    description: `注意：react-fetch 内部处理请求的时候只通过 code,msg,results来作为内部逻辑，code为200判定为请求成功，不为200时判定为错误，msg会传入到error组件，拿到results后，会将results作为业务组件的data属性
如果后端的返回不满足上诉格式，需要在preset的transformResponse方法做转换适配
ajax为一个axios实例，每个实例的拦截器可能不同，默认会在内部自动创建一个axios实例，但是没有任何拦截器，如果想给其添加拦截器，可以自行创建axios实例通过preset设置
preset 可以单独放一个文件里，在入口文件顶部引入。
preset全局设置一次即可。`,
    code: `const {preset} = ReactFetch;
const {default: Input} = AntdInput;
const {default: Spin} = AntdSpin;
const {default: Empty} = AntdEmpty;
const {default: Result} = AntdResult;
const {default: Space} = AntdSpace;

let timeout = 1000;

preset({
    ajax: (config) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (config.url === '/data1') {
                    console.log('data1 request');
                    resolve({
                        data: {
                            code: 0,
                            data: [
                                {title: '数据一'},
                                {title: '数据二'}
                            ]
                        }
                    });
                    return;
                }
                if (config.url === '/data2') {
                    resolve({
                        data: {
                            code: 0,
                            data: {
                                list: _.range(0, config.params.size || 10).map((index) => {
                                    return {
                                        title: config.params.page + '页，数据' + (index + 1)
                                    }
                                }),
                                total: 100
                            }
                        }
                    });
                    return;
                }
                return resolve({
                    data: {
                        code: 404,
                        msg: '没找到资源'
                    }
                });
            }, timeout);
        });
    },
    loading: <Spin>数据加载中...</Spin>,
    empty: <Empty/>,
    error: (msg) => <Result title={msg}/>,
    transformResponse: (response) => {
        const {data} = response;
        response.data = {
            code: data.code === 0 ? 200 : data.code, msg: data.msg, results: data.data
        };
        return response;
    }
});

const Preset = () => {
    return <Space direction="vertical">
        <div>该组件只设置其他示例的mock data，不展示任何功能</div>
        <div>这里可以设置模拟请求延迟时间</div>
        <Input type="text" defaultValue={timeout} onChange={(e) => {
            timeout = parseInt(e.target.value);
        }} addonAfter="ms"/>
    </Space>
};

render(<Preset/>);

`,
    scope: [{
    name: "ReactFetch",
    packageName: "@kne/react-fetch",
    component: component_91
},{
    name: "AntdInput",
    packageName: "antd/lib/input",
    component: component_92
},{
    name: "AntdSpin",
    packageName: "antd/lib/spin",
    component: component_93
},{
    name: "AntdEmpty",
    packageName: "antd/lib/empty",
    component: component_94
},{
    name: "AntdResult",
    packageName: "antd/lib/result",
    component: component_95
},{
    name: "AntdSpace",
    packageName: "antd/lib/space",
    component: component_96
},{
    name: "_",
    packageName: "lodash",
    component: component_97
}]
},{
    title: `请求成功`,
    description: `发送一个成功请求，内部组件拿到数据并展示数据`,
    code: `const {createWithFetch} = ReactFetch;
const {default: List} = AntdList;

const Remote = createWithFetch({
    url: '/data1'
})(({data}) => {
    return <List bordered>
        {data.map((item, index) => {
            return <List.Item key={index}>{item.title}</List.Item>
        })}
    </List>;
});

render(<Remote/>);

`,
    scope: [{
    name: "ReactFetch",
    packageName: "@kne/react-fetch",
    component: component_91
},{
    name: "AntdList",
    packageName: "antd/lib/list",
    component: component_98
}]
},{
    title: `使用Fetch组件发送请求`,
    description: `使用Fetch组件发送一个成功请求，内部组件拿到数据并展示数据`,
    code: `const {default: Fetch} = ReactFetch;
const {default: List} = AntdList;

const Remote = () => {
    return <Fetch url="/data1" loader={() => {
        return new Promise((resolve) => {
            resolve([{title:'loader数据'}]);
        })
    }} render={({data}) => {
        return <List bordered>
            {data.map((item, index) => {
                return <List.Item key={index}>{item.title}</List.Item>
            })}
        </List>
    }}/>
};

render(<Remote/>);

`,
    scope: [{
    name: "ReactFetch",
    packageName: "@kne/react-fetch",
    component: component_91
},{
    name: "AntdList",
    packageName: "antd/lib/list",
    component: component_98
}]
},{
    title: `请求失败`,
    description: `发送一个失败请求，内部组件不渲染，直接展示错误信息`,
    code: `const {createWithFetch} = ReactFetch;

const Error = createWithFetch({
    url: '/error'
})(() => {
    return '这是一个错误请求';
});

render(<Error/>);

`,
    scope: [{
    name: "ReactFetch",
    packageName: "@kne/react-fetch",
    component: component_91
}]
},{
    title: `分页数据请求`,
    description: `分页加载数据`,
    code: `const {useState} = React;
const {createWithFetch} = ReactFetch;
const {default: Button} = AntdButton;
const {default: Pagination} = AntdPagination;
const {default: Space} = AntdSpace;
const {default: List} = AntdList;

const Page = createWithFetch({
    url: '/data2',
    params: {page: 1, size: 10}
})(({data, requestParams, isRefresh, reload, refresh}) => {
    return <Space direction="vertical">
        <List bordered>
            {data.list.map((item, index) => {
                return <List.Item key={index}>{item.title}</List.Item>
            })}
        </List>
        <div>
            <Pagination current={requestParams.params.page} total={data.total}
                        pageSize={requestParams.params.size} onChange={(page, size) => {
                (isRefresh ? refresh : reload)({params: {page, size}});
            }}/>
        </div>
    </Space>;
});

const Remote = () => {
    const [isRefresh, setIsRefresh] = useState(false);
    return <Space direction="vertical">
        <div>
            <Button type="primary" onClick={() => {
                setIsRefresh((value) => !value);
            }}>以{isRefresh ? 'refresh' : 'reload'}方式加载
            </Button>
        </div>
        <Page isRefresh={isRefresh}/>
    </Space>
};

render(<Remote/>);

`,
    scope: [{
    name: "ReactFetch",
    packageName: "@kne/react-fetch",
    component: component_91
},{
    name: "AntdButton",
    packageName: "antd/lib/button",
    component: component_99
},{
    name: "AntdPagination",
    packageName: "antd/lib/pagination",
    component: component_100
},{
    name: "AntdSpace",
    packageName: "antd/lib/space",
    component: component_96
},{
    name: "AntdList",
    packageName: "antd/lib/list",
    component: component_98
},{
    name: "_",
    packageName: "lodash",
    component: component_97
}]
},{
    title: `下拉加载更多`,
    description: `下拉加载更多数据`,
    code: `const {useEffect, forwardRef, useRef, useImperativeHandle} = React;
const {createWithFetch} = ReactFetch;
const {default: Space} = AntdSpace;
const {default: List} = AntdList;
const {default: Spin} = AntdSpin;
const {throttle} = _;

const ScrollLoader = forwardRef(({
                                     className,
                                     noMore,
                                     getScrollContainer,
                                     onLoader,
                                     isLoading,
                                     completeTips,
                                     children
                                 }, ref) => {
    const scrollerRef = useRef();
    const onLoaderHandlerRef = useRef(onLoader);
    onLoaderHandlerRef.current = onLoader;
    const canLoadRef = useRef(!noMore && !isLoading);
    canLoadRef.current = !noMore && !isLoading;
    useImperativeHandle(ref, () => {
        return scrollerRef.current;
    }, []);
    useEffect(() => {
        if (canLoadRef.current && scrollerRef.current.clientHeight === scrollerRef.current.scrollHeight) {
            onLoaderHandlerRef.current();
        }
    }, [isLoading]);
    useEffect(() => {
        const el = scrollerRef.current;
        const scrollHandler = throttle((e) => {
            const el = e.target;
            if (canLoadRef.current && el.clientHeight + el.scrollTop + 20 > el.scrollHeight) {
                onLoaderHandlerRef.current();
            }
        }, 100);
        el.addEventListener('scroll', scrollHandler, true);
        return () => {
            el.removeEventListener('scroll', scrollHandler, true);
        };
    }, []);
    return <div ref={scrollerRef} className="load-container">
        <Space direction='vertical'>
            <div>{children}</div>
            {isLoading ? <div className='scroller-no-more'><Spin/></div> : null}
            {noMore ? <div className='scroller-no-more'>{completeTips}</div> : null}
        </Space>
    </div>;
});

const Remote = createWithFetch({
    url: '/data2',
    params: {page: 1, size: 10}
})(({data, isComplete, requestParams, loadMore}) => {
    return <ScrollLoader isLoading={!isComplete}
                         noMore={isComplete && requestParams.params.page >= Math.ceil(data.total / requestParams.params.size)}
                         onLoader={() => {
                             return loadMore({
                                 params: {page: requestParams.params.page + 1}
                             }, (data, newData) => {
                                 return Object.assign({}, newData, {
                                     list: data.list.concat(newData.list)
                                 });
                             });
                         }} completeTips="加载完成">
        <List bordered>
            {data.list.map((item, index) => {
                return <List.Item key={index}>{item.title}</List.Item>
            })}
        </List>
    </ScrollLoader>;
});


render(<Remote/>);

`,
    scope: [{
    name: "ReactFetch",
    packageName: "@kne/react-fetch",
    component: component_91
},{
    name: "AntdButton",
    packageName: "antd/lib/button",
    component: component_99
},{
    name: "AntdPagination",
    packageName: "antd/lib/pagination",
    component: component_100
},{
    name: "AntdSpace",
    packageName: "antd/lib/space",
    component: component_96
},{
    name: "AntdList",
    packageName: "antd/lib/list",
    component: component_98
},{
    name: "_",
    packageName: "lodash",
    component: component_97
},{
    name: "AntdSpin",
    packageName: "antd/lib/spin",
    component: component_93
}]
},{
    title: `空数据`,
    description: `用isEmpty判断数据是不是空状态`,
    code: `const {createWithFetch} = ReactFetch;
const {default: List} = AntdList;

const Remote = createWithFetch({
    url: '/data1',
    isEmpty: () => true
})(({data}) => {
    return <List bordered>
        {data.map((item, index) => {
            return <List.Item key={index}>{item.title}</List.Item>
        })}
    </List>;
});

render(<Remote/>);

`,
    scope: [{
    name: "ReactFetch",
    packageName: "@kne/react-fetch",
    component: component_91
},{
    name: "AntdList",
    packageName: "antd/lib/list",
    component: component_98
}]
},{
    title: `用loader加载数据`,
    description: `展示了用loader来加载数据的例子`,
    code: `const {createWithFetch} = ReactFetch;


const Example = createWithFetch({
    loader: async (data) => {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign({}, data, {message: '请求成功'}));
            }, 1000);
        });
    }
})(({data,requestParams}) => {
    console.log(requestParams);
    return JSON.stringify(data, null, 2);
});

render(<Example data={{name: 'jack'}}/>);

`,
    scope: [{
    name: "ReactFetch",
    packageName: "@kne/react-fetch",
    component: component_91
}]
},{
    title: `transform`,
    description: `展示transformResponse的调用`,
    code: `const {createWithFetch} = ReactFetch;
const {default: List} = AntdList;

const Remote = createWithFetch({
    url: '/data1',
    transformResponse: (response) => {
        console.log(response);
        return {
            data:{
                code: 200, results: [
                    {title: '我是response被拦截以后的内容'}
                ]
            }
        };
    }
})(({data}) => {
    return <List bordered>
        {data.map((item, index) => {
            return <List.Item key={index}>{item.title}</List.Item>
        })}
    </List>;
});

render(<Remote/>);

`,
    scope: [{
    name: "ReactFetch",
    packageName: "@kne/react-fetch",
    component: component_91
},{
    name: "AntdList",
    packageName: "antd/lib/list",
    component: component_98
}]
},{
    title: `缓存操作`,
    description: `展示缓存操作`,
    code: `const {createWithFetch, getCache} = ReactFetch;
const {default: List} = AntdList;
const {default: Space} = space;
const {default: Button} = button;
const {useRef} = React;

const Remote = createWithFetch({
    url: '/data1',
    cache: 'cache'
})(({data}) => {
    return <List bordered>
        {data.map((item, index) => {
            return <List.Item key={index}>{item.title}</List.Item>
        })}
    </List>;
});

const cache = getCache();

const Example = () => {
    const ref = useRef();
    return <Space direction="vertical">
        <Remote ref={ref}/>
        <Space>
            <Button onClick={() => {
                ref.current.reload({}, false);
            }}>获取数据</Button>
            <Button onClick={() => {
                cache.delByCacheName('cache');
            }}>清除缓存</Button>
        </Space>
    </Space>;
};

render(<Example/>);

`,
    scope: [{
    name: "ReactFetch",
    packageName: "@kne/react-fetch",
    component: component_91
},{
    name: "AntdList",
    packageName: "antd/lib/list",
    component: component_98
},{
    name: "space",
    packageName: "antd/lib/space",
    component: component_96
},{
    name: "button",
    packageName: "antd/lib/button",
    component: component_99
}]
}]
    }
};
export default readmeConfig;

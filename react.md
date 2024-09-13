## 说说对 React 的理解？有哪些特性？
组件化的开发模式，不错的性能
丰富的生态，跨平台支持
函数式编程，虚拟算法加上diff算法操作dom

## 使用
npx create-react-app react-basic   [在vscode终端中创建]
渲染过程：index.js=>渲染的入口 app.js=>根组件 =>index.html 中的 root 节点中。

## 什么是 JSX（javascript 和 xml<html>的缩写），表示在 js 代码中编写 HTML 的模板结构，是 React 中编写 UI 模板的方式。
特点：
1、类似 HTML 的语法：JSX 语法看起来很像 HTML，但它实际上是 JavaScript 的一种语法扩展。
2、组件化：通过 JSX，我们可以将 UI 组件像函数一样进行组合和复用。
3、转换为 JavaScript：在运行时，JSX 会被 Babel 等编译工具转换成 React.createElement 调用。

优势：HTML 的声明式模块写法，js 可编写的能力

Babel：用于将代码编译成基本代码

列表渲染：map return 加上 key
条件渲染：逻辑与 运算符  三元运算
{flag && <span> this is a span </span>}
{flag ？ <span> this is a span </span> ：<span> this is a span,loading </span>}

事件绑定：on+事件名称={} onClick={函数}
注意：如果需要自定义传入参数，需要将函数写成箭头函数，()=>fun('jack')实参
即想要自定义参数又想要事件对象E,(e)=>fun('jack',e) 函数里面的形参需要和这个顺序保持一致。  注意vue中的写法

样式控制：
行内样式：style={{color:'red',fontSize:'50px'}}不推荐,驼峰
类名控制：className="foo"   注意不是class

## 在react中使用过的一些库
1、classnames:优化类名控制（js库）  import classNames from 'classnames'
className={classNames('nav-item',{active:type === item.type})}
静态类名：'nav-item'
动态类名：active
条件：type === item.type
2、uuid 生成随机数
3、Day.js github下载一个库（模块化，就是将时间转为标准日期格式）
4、lodash:orderBy(排序)、防抖、深拷贝。

## 组件通信
父子通信：
1、在子组件中传递数据<Child getMessage={getMessage}>vue中插槽表示react的父传子<Child>
2、function Child(props){console.log(props.getMessage)} =>实现父传子，在函数中传递实参，该函数会在父组件中执行，因此可实现子传父。

兄弟组件通信：Child=>Child1.将Child数组传给father,father再传给Child1.基本使用还是父子通信(使用状态提升)

跨层级组件通信：App=>A=>B,也就是App和B组件之间的通信
1、使用createContext方法创建一个上下文对象Ctx<可以新建一个js文件，createContext方法生成一个对象>
2、在顶层组件中通过Ctx.provider组件提供数据
<Ctx.provider value='里面是传递的数据'>
    <Child></Child>
</Ctx.provider>
3、在底层组件中通过useContext钩子函数获取数据<里面的参数为js文件生成的对象>
const msg = useContext(Ctx)
B=>App:父组件向子组件传递函数，子组件再向孙组件传递函数

4、非关系组件通信：全局资源管理器，例如redux

`注意：父组件传递的数据子组件不能修改`

## 自定义hook函数（use打头的函数，通过自定义Hook函数可以用来实现逻辑的封装和复用）
定义函数封装，将需要的结果return返回出去即可（对象或者数组都可以）。
规则：
1、只能在组件或者其它自定义Hook函数中使用
2、只能在组件的顶层使用，不能嵌套在if，for和其它函数中

## 说说对React Hooks的理解？解决了什么问题？(useState,useEffect)
作用：它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
useState：数据驱动视图更新
useEffect:是一个React Hook函数，用于在Raect组件中创建不是由事件引起而是由渲染本身引起的操作，比如发送AJAX请求，更改DOM等。类似生命周期   useEffect(()=>{},[]) 执行一次

`没有依赖项：初始渲染执行一次，组件更新时再次执行`
`依赖项为空数组：初始渲染时执行一次`
`传入特定的依赖项：初始渲染+依赖项变化时执行[count] ==>只有count变化时才会执行`

清除副作用：在useEffect中编写的由渲染本身引起的对接外部的操作，比如在useEffect中开启了一个定时器（副作用），我们在组件卸载时把这个定时器清掉，就是清除副作用；
useEffect(()=>{
    console.log('初次渲染执行')
    return ()=>{
        //清除副作用
        console.log('组件卸载执行')
    }
},[])  =>官网文档
副作用：的是那些影响到组件之外的操作，例如，数据获取，dom操作，打印日志，定时器等

useEffect：在浏览器绘制后异步执行`肯定在DOM更新之后`，适用于大多数副作用。  `它不会阻塞浏览器的渲染。适合那些不需要立即影响布局的副作用操作。`
useLayoutEffect：在 DOM 更新后`浏览器绘制之前`、浏览器绘制之前同步执行，适用于需要布局测量或 DOM 操作的副作用。`可以阻止闪烁，但是同步执行，会阻止浏览器的渲染。`
useEffect(()=>{
    setData(2)
},[count])  //当count变化时，页面渲染一次展示count,再执行里面的函数，如果里面的函数触发了页面的渲染，会再次渲染，产生页面闪烁。

测量 DOM 尺寸：获取和操作元素的尺寸或位置（例如，设置一个动态宽度或高度。
同步动画：在浏览器绘制前完成 DOM 相关的动画设置，以避免视觉上的抖动或不稳定。
`MutationObserver 是一个原生的 JavaScript API，用于监视 DOM 的变动。你可以用它来监听某个 DOM 元素的变动，并在变动发生后执行代码。`

useContext：组件通信（爷孙）
useRef：获取组件dom结构 
<第一步：const inputRef = useRef(null)
<input type="text" ref={inputRef}/>    dom.foucs()自动聚焦
第二部：console.log(inputRef.current)   类似vue中ref标签>
vue：let btn = ref(null) <button ref="btn"></button> btn.value  区别：ref="btn"
useHistory：可以让组件内部直接访问history，无须通过props获取
useLocation： 会返回当前 URL 的 location 对象

通过对上面的初步认识，可以看到hooks能够更容易解决状态相关的重用的问题：
每调用useHook一次都会生成一份独立的状态
通过自定义hook能够更好的封装我们的功能
编写hooks为函数式编程，每个功能都包裹在函数中，整体风格更清爽，更优雅
hooks的出现，使函数组件的功能得到了扩充，拥有了类组件相似的功能，在我们日常使用中，使用hooks能够解决大多数问题，并且还拥有代码复用机制，因此优先考虑hooks

## 说说你对函数式编程的理解？优缺点？ (命令式编程，声明式编程和函数式编程)
`理解：就是利用函数封装了一个基本方法，不关心里面执行的过程，只关心结果`
核心概念：
`纯函数：是对给定的输入返还相同输出的函数，并且要求你所有的数据都是不可变的，即纯函数=无状态+数据不可变`
1、输出仅和输入的参数有关，反例：Math.random()
2、不改变外部状态（例如，不修改全局变量），函数的返回值生成一个新的值，不改变原有的变量
`高阶函数:是指可以接受函数作为参数或者返回一个函数的函数。高阶函数在函数式编程中非常常见，用于创建可组合和可重用的代码。`
`组合和管道：目的是将多个函数组合成一个函数，可以把很多小函数组合起来完成更复杂的逻辑`
注意：实现方法compose，pipe

优点：
1、更好的管理状态：因为它的宗旨是无状态，或者说更少的状态，能最大化的减少这些未知、优化代码、减少出错情况
2、更简单的复用：固定输入->固定输出，没有其他外部变量影响，并且无副作用。这样代码复用时，完全不需要考虑它的内部实现和外部影响
3、更优雅的组合：往大的说，网页是由各个组件组成的。往小的说，一个函数也可能是由多个小函数组成的。更强的复用性，带来更强大的组合性
4、隐性好处。减少代码量，提高维护性

缺点：
1、性能：函数式编程相对于指令式编程，性能绝对是一个短板，因为它往往会对一个方法进行过度包装，从而产生上下文切换的性能开销
2、资源占用：在 JS 中为了实现对象状态的不可变，往往会创建新的对象，因此，它对垃圾回收所产生的压力远远超过其他编程方式
3、递归陷阱：在函数式编程中，为了实现迭代，通常会采用递归操作

## 说说React Jsx转换成真实DOM过程？ 
`JSX（JavaScript的拓展）通过babel最终转化成React.createElement()这种形式(转换为js代码)，例如：`
`规则：当首字母为小写时，其被认定为原生 DOM 标签，当首字母为小写时，其被认定为原生 DOM 标签`

原生标签节点
文本节点
函数组件
类组件

`使用React.createElement或JSX编写React组件，实际上所有的 JSX 代码最后都会转换成React.createElement(...) ，Babel帮助我们完成了这个转换的过程。`
`createElement函数对key和ref等特殊的props进行处理，最终构造成一个虚拟DOM对象`
`ReactDOM.render将生成好的虚拟DOM渲染到指定容器上，最终转换为真实DOM`

## redux(pinia)可以独立于框架运行
redux Toolkit:编写redux逻辑的方式，简化书写方式
react-redux:连接redux和react的中间件

单一数据源：整个应用的状态存储在一个集中式的 store 中。
不可变数据：状态是不可变的，状态的每次更新都会返回一个新的状态对象。
纯函数：所有的状态更新逻辑都在纯函数（reducers）中处理。
Middleware：支持 middleware 来处理异步逻辑或其他副作用（如 redux-thunk, redux-saga）。

优势
强大的中间件支持：Redux 有成熟的中间件系统，允许处理异步操作、日志记录、错误处理等。例如，redux-thunk 和 redux-saga 提供了强大的异步处理能力。
开发者工具：Redux DevTools 是一个强大的调试工具，允许你查看状态变化、回溯操作、时间旅行调试等。
社区支持：Redux 有一个庞大且活跃的社区，提供了大量的教程、插件和最佳实践。
中立性：可以与任何 JavaScript 框架或库一起使用，而不仅仅是 React。
适用场景
复杂的大型应用程序，尤其是当需要复杂的状态管理和强大的调试工具时。
需要跨多个组件和层级共享状态的应用程序。
需要处理大量异步操作或需要复杂的中间件配置时。

核心概念
1、Store：存储应用的整个状态树。应用中只能有一个 Store。
2、State：存储在 Store 中的状态。应用的整个状态树以一个对象的形式存储在 State 中。
3、Action：描述 State 变化的普通对象。每个 Action 都必须有一个 type 属性，用于描述如何改变 State。
4、Reducer：一个纯函数，接收当前的 State 和 Action，返回一个新的 State。
5、Dispatch：发送 Action 的唯一方法。调用 store.dispatch(action) 将 Action 发送给 Reducer。
6、Subscribe：注册一个回调函数，当 State 发生变化时，会调用这个回调函数

1、单一数据源   
2、state 是只读的
3、使用纯函数来执行修改
<!-- 可以理解为单向数据流 -->
1、清晰的数据流动路径
2、易于调试和维护
3、数据的一致性和预测性

1、createStore可以帮助创建 store
2、store.dispatch 帮助派发 action , action 会传递给 store
3、store.getState 这个方法可以帮助获取 store 里边所有的数据内容
4、store.subscrible 方法订阅 store 的改变，只要 store 发生改变， store.subscrible 这个函数接收的这个回调函数就会被执行

`中间件：主要用于异步操作处理。（对store.dispatch进行改造处理）=>类似于拦截器的思想，同步执行在纯reducer函数中执行。`在 Redux 中，中间件是用于拦截和处理 actions 的函数，允许在 action 发送到 reducer 之前对其进行处理、修改或添加额外的逻辑。

## 说说你对React Router的理解？常用的Router组件有哪些？(是什么？有哪些？参数传递？)

react-router等前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面

路由的本质就是页面的URL发生改变时，页面的显示结果可以根据URL的变化而变化，但是页面不会刷新
因此，可以通过前端路由可以实现单页(SPA)应用

react-router主要分成了几个不同的包：

react-router: 实现了路由的核心功能
react-router-dom： 基于 react-router，加入了在`浏览器`运行环境下的一些功能
react-router-native：基于 react-router，加入了 react-native 运行环境下的一些功能
react-router-config: 用于配置静态路由的工具库

BrowserRouter、HashRouter 一般导入BrowserRouter会重命名为router  <Router>包裹Route使用，但一般不会这么使用，使用createBrowserRouter:Router中包含了对路径改变的监听，并且会将相应的路径传递给子组件.
Route:用于路径的匹配，然后进行组件的渲染，对应的属性如下：path,component,render,`exact开启精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件`
Link、NavLink:NavLink作用和link一样，只是添加了一些样式activeStyle：活跃时（匹配时）的样式activeClassName={{color:"red"}}：活跃时添加的class,最终会被渲染成a元素，其中属性to代替a标题的href属性.
switch：组件的作用适用于当匹配到第一个组件的时候，后面的组件就不应该继续匹配
redirect:重定向


路径语法：
<Route path="/hello/:name">         // 匹配 /hello/michael 和 /hello/ryan
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/michael 和 /hello/ryan
<Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/path/to/hello.jpg

`React Router 是建立在 history 之上的。 简而言之，一个 history 知道如何去监听浏览器地址栏的变化， 并解析这个 URL 转化为 location 对象， 然后 router 使用它匹配到路由，最后正确地渲染对应的组件。`

常见的history模式：

1、browserHistory：
2、hashHistory：
3、createMemoryHistory：用于特殊的内存管理或测试需求（或者没有URL功能的环境，react native），并且不会对浏览器 URL 产生影响。

 useHistory:提供了访问和操作浏览器历史记录的能力。这允许你进行编程式导航，即在代码中控制路由跳转。
 `注意: useHistory 在 React Router v6 中被移除，取而代之的是 useNavigate。`
useParams:`useParams 允许你访问当前 URL 的路由参数。这对于获取动态路由中的参数（例如，/users/:userId）非常有用。`
使用 useParams 获取一个包含 URL 参数的对象。参数的名称与路由定义中的占位符一致。
useLocation:useLocation 允许你访问当前的 URL 信息，包括路径、查询字符串和哈希部分。它对于处理基于位置的逻辑非常有用。

参数传递的四种方式
1、路径参数： <Route path="/user/:userId" element={<UserProfile />} />  `useParams()`可以获得该参数    `vue中使用useRoute()`
优势：清晰、便于 SEO。
缺点：灵活性较低，复杂参数难处理。    <Route path="/hello/:name">   // 匹配 /hello/michael 和 /hello/ryan

2、查询参数：在URL地址的末尾，可以通过组件中的 `useSearchParams()` 钩子获取参数值。 <Route path="/user" element={<UserProfile />} />
优势：灵活、适合可选参数和多个参数。
缺点：不适合 SEO，URL可能冗长。 http://example.com/path?key1=value1&key2=value2   `navigate('/user?name=zhangsan&key=1123');`

3、状态参数：可以通过导航函数传递，用于在页面跳转时传递复杂的数据对象。<Route path="/" element={<Link to="/user" state={{ userId: '123' }}>Go to User Profile</Link>}/>
优势：适合传递复杂数据，不暴露在 URL 中。
缺点：页面刷新时会丢失，不能用于书签和共享 URL,`直接刷入地址时不会传递参数`,可以理解为只有当点击了link标签才能传递参数。  `useLocation()`获取参数
`navigate('/user', { state: { userId: '123' } });`

4、上下文参数：使用 React 的 Context API 在组件树中传递参数，适合全局共享的状态（在根组件设置的话）,参数只能在子组件中使用。
    <UserContext.Provider value={{ userId: '123' }}>
      <Routes>
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </UserContext.Provider>   子组件通过`useContext()`获得参数。

`vue中传递参数的方式：`
1、路径参数
2、查询参数： this.$router.push({ path: '/user', query: { name: 'zhangsan', key: '1123' } });
3、路由元信息：
const routes = [
  {
    path: '/user',
    component: UserProfile,
    meta: { requiresAuth: true }
  }
];   三种都是通过useroute()获取参数

参数传递方式：
Vue Router 和 React Router 都支持路由参数和查询参数，但 React Router 还支持通过状态参数传递数据。
Vue Router 通过 route.query 和 route.params 访问参数，而 React Router 通过 useLocation 和 useParams 访问。
使用方式：
Vue Router 通常在路由配置和组件中使用 useRoute 钩子来访问参数。
React Router 则使用 useLocation 和 useParams 钩子来访问查询参数和路由参数。
状态参数：
React Router 支持通过 state 参数在导航中传递数据，适用于临时数据传递。
Vue Router 不直接支持状态参数，但可以通过 query 或其他方法实现类似功能。


## 说说React Router有几种模式？实现原理？
Hash:
工作原理：#后面的部分表示路由，浏览器不会向服务器发送hash部分的数据。当hash部分发生变化时，HashRouter 会解析新的 hash 值并渲染相应的组件。它会监听 hash 变化（window.location.hash）来更新路由状态。
优点
1、兼容性: HashRouter 不依赖于 HTML5 History API，因此在所有现代浏览器以及较老的浏览器中都能正常工作。
2、无需服务器配置: 由于 hash 部分不会被发送到服务器，因此`不需要对服务器进行额外配置来处理路径重写。`
3、简单性: 实现简单，适合不需要复杂 URL 处理的应用。
缺点
1、URL 可读性: 使用 hash 的 URL 不如传统 URL 可读。例如，http://example.com/#/path/to/page 看起来不如 http://example.com/path/to/page 直观。
2、SEO 支持: Hash-based URLs 对搜索引擎的支持较差，因为 hash 部分不会被发送到服务器，搜索引擎爬虫可能无法有效索引这些 URL。

BrowserRouter
工作原理：BrowserRouter 使用 HTML5 的 History API（history.pushState 和 history.replaceState）来管理路由。它能够使用标准的 URL 路径，例如 http://example.com/path/to/page。这种模式允许使用更直观和干净的 URL。在用户导航时通过 History API 改变浏览器的历史记录和 URL。它会监听 popstate 事件来更新路由状态并渲染相应的组件。

优点
URL 可读性: 使用标准的 URL 结构，使 URL 更加简洁和可读。例如，http://example.com/path/to/page 看起来更符合常规的 URL 结构。
SEO 支持: 更好的 SEO 支持，因为 URL 的路径部分是标准的，并且可以被服务器处理和索引。
缺点
服务器配置: 需要服务器配置来处理所有的 URL 请求并将它们重定向到应用的入口 HTML 页面。否则，用户直接访问某个 URL 可能会导致 404 错误。
兼容性: 虽然现代浏览器普遍支持 HTML5 History API，但在某些旧版浏览器或特定环境中可能会有兼容性问题。

`举例express服务器进行路径重写：`
`app.get('/*', (req, res) => {`
    `res.sendFile(path.join(__dirname, 'build', 'index.html'));`
`});`


## react有哪些更新
1、并发模式
2、更新 render API
3、自动批处理：
react18之前：只有在函数内部调用多次setstate或者usestate才会合并为一次（异步回调，promise和定时器不会合并）
react18之前：任何情况下都会自动执行批处理，多次状态更新始终合并为一次更新
4、Suspense 支持 SSR
5、startTransition
6、useTransition
7、useDeferredValue
8、useId
9、提供给第三方库的 Hook


## 简述React的生命周期
componentDidMount：组件挂载后调用，适合进行网络请求、订阅等操作。
componentDidUpdate：组件更新后调用，可以进行 DOM 操作或进一步的数据请求。
shouldComponentUpdate：组件更新前调用，决定组件是否重新渲染，返回 true 或 false。
componentWillUnmount：组件卸载前调用，用于清理资源（如取消订阅、清理定时器）。
以上是类组件对应的生命周期，目前更多采用函数组件对应的hook
useEffect:componentDidMount：componentDidUpdate：componentWillUnmount：

## react的事件机制和原生的DOM事件流有什么区别

事件委托：是一种将事件监听器添加到父元素上，而不是每个子元素上，以此来利用事件冒泡机制处理子元素事件的方法。这样可以提高性能，减少内存消耗，尤其是在需要处理大量动态生成的子元素时。
当我们使用原生 JavaScript 来绑定事件处理函数时，事件处理函数是直接绑定到具体的 DOM 元素上的
React 并不是将事件处理函数直接绑定到具体的 DOM 元素上，而是通过一种叫做事件委托的机制，将所有的事件处理函数统一绑定到 document 对象上，然后通过事件冒泡机制来处理具体的事件。

由于事件绑定位置的不同，原生 DOM 事件与 React 事件在触发顺序上有所区别。

原生 DOM 事件：由于是直接绑定到具体的 DOM 元素上的，点击 DOM 元素时，事件处理函数会立即执行。
React 事件：事件会先冒泡到 document，然后由 React 内部机制找到相应的处理函数并执行。因此，从执行顺序上来说，React 事件绑定到 document 上的处理函数会稍后执行
react17之前是绑定在document（HTML）上的，17之后是绑定在#root（根div）上的
1、性能优化：通过将事件监听器限制在根元素 #root 内部，React 可以减少全局事件监听的开销，并且可以更高效地处理事件。
2、隔离性：将事件处理限制在根元素内，可以更好地隔离 React 应用与外部代码的事件处理，减少冲突和副作用。
3、兼容性：这种变更使得 React 应用更容易与其他库和框架集成，因为事件处理更加局部化和隔离。


## react-router的工作原理？react-router-dom有哪些组件
1.监控浏览器url的变化（历史模式使用pushState和replaceState历史管理，监听poptate感知地址变化）
2.找到匹配的路由：
3.渲染对应的组件
4.异步加载和懒加载
5.嵌套路由
路由的产生，传统的路由基于http请求，每一次切换都是发送一个html界面回来，现在的路由是每一个切换都返回数据，html界面（里面包裹JavaScript）在最开始就已经发送过来了（首屏加载慢）
switch：只保证匹配一个路由，只有一个路由渲染（匹配到了就结束），在v6之后已经被routes取代，里面包裹的都是route组件

## setstate是同步还是异步的？具体作用？

在React中，setState()函数通常被认为是异步的，这意味着调用setState()时不会立刻改变react组件中state的值，
setState通过触发一次组件的更新来引发重绘，多次setState函数调用产生的效果会合并。

setState 是 React 类组件中的一个方法，用于更新组件的状态（state）。每次调用 setState 时，React 会将新的状态与现有状态合并，
并触发一次重新渲染，以便组件能够反映最新的状态变化。有时候，新的状态依赖于前一个状态。这时，可以传递一个函数给 setState，
该函数接收前一个状态作为参数。

## 什么是fiber，解决了什么问题？
在 React 中，Fiber 是一种新的协调算法，用来更好地管理和更新 React 应用的用户界面。Fiber 是对 React 内部机制的一次重写，主要目的是解决 React 在大型应用中的性能问题，尤其是在处理复杂 UI 更新时的效率问题。

什么是 Fiber？
Fiber 是 React 内部的一种数据结构，它代表了一个可以执行的工作单元。每个 Fiber 对象对应 React 应用中的一个组件实例或一个虚拟 DOM 节点。通过 Fiber，React 能够将渲染工作拆分成多个小任务，使得它可以更加灵活地调度更新任务，避免阻塞主线程。

Fiber 解决了什么问题？
`异步渲染：`
在 React 的老架构中（即 Fiber 之前），更新 UI 是一个同步的过程。当应用中的某个状态发生变化时，React 会立即执行整个更新过程，直到完成。这种同步更新的方式在处理大型和复杂的应用时可能会导致主线程被阻塞，从而引起用户界面的卡顿。
Fiber 引入了一种异步渲染模式，可以将渲染工作拆分成多个小任务，允许 React 在不同任务之间暂停和继续工作。这种方式使得 React 可以在空闲时间执行这些任务，确保用户界面的响应速度。

`优先级更新：`
Fiber 允许 React 给不同的更新任务分配不同的优先级。例如，用户交互事件（如点击按钮）应当比网络请求的数据更新更快地响应。通过 Fiber，React 可以优先处理高优先级任务，而延迟处理低优先级任务。这提高了用户界面的响应速度和流畅性。

`中断和恢复渲染：`
在 Fiber 架构下，React 可以在渲染过程中暂停工作，去处理其他更紧急的任务（如用户输入事件），然后再恢复渲染工作。这种能力防止了长时间的渲染操作阻塞主线程，从而减少了卡顿和延迟的现象。
错误边界和恢复：
Fiber 还为 React 带来了更好的错误处理能力。如果在渲染过程中某个组件抛出了错误，React 可以优雅地恢复，并仅重新渲染出错的部分，而不会影响整个应用。
总结
React 的 Fiber 是为了提升应用的可响应性和性能而引入的一个重要机制。它解决了旧架构下同步渲染的局限性，使得 React 可以更加灵活和高效地更新 UI，特别是在处理复杂和大型应用时，极大地提高了用户体验。


## react在哪里捕获错误

1、React 没有内置的全局错误处理机制，但可以使用 window.onerror 来捕获全局错误。
2、对于 API 请求，可以使用 try...catch 或拦截器来捕获错误。请求拦截器
3、在 React 中，还可以使用一些第三方库来处理错误，例如 Sentry，可以帮助捕获和跟踪前端和后端的错误。
4、错误边界=>一般在类组件中使用，就是定义一个组件（该组件中componentDidCatch钩子函数捕获错误），然后用该组件包裹需要检查错误的组件
5、在函数组件中通过`react-error-boundary`包实现类似功能。

## react无状态组件（函数组件）和class类组件的区别
最大的不同：引入hooks（状态管理，生命周期）
类组件是用`ES6`类定义的组件。它继承自 React.Component 类，并且必须实现 render 方法。
1、状态管理：类组件有内置的状态管理机制，通过 this.state 和 this.setState。
2、生命周期方法：类组件可以使用生命周期方法，如 componentDidMount、componentDidUpdate 和 componentWillUnmount。
3、使用 this：类组件使用 this 关键字来访问 props、状态和方法。
4、更冗长：相比函数组件，类组件的语法更冗长，包含构造函数、this 绑定等。

## react如何做路由监听

## react有几种方式改变state
1、在类组件中使用 setState。
2、在函数组件中使用 useState Hook。更适合于简单的状态管理。直接提供状态和更新函数。
3、在函数组件中使用 useReducer Hook。更适合于复杂的状态管理，尤其是涉及到多个子值或复杂的状态转换逻辑时。
使用类似于 Redux 的 reducer 函数来管理状态。

## react有几种创建组件的方法
1、React.createClass
2、ES6 class
3、无状态函数（函数组件）

## React中的props和state有什么区别？
props 是传递给组件的（类似于函数的形参），它们是只读的，不应该在子组件中修改。而 state 是在组件内被组件自己管理的（类似于在一个函数内声明的变量）
props：当父组件的 props 发生变化时，子组件会重新渲染。
state：当组件的 state 发生变化时，组件会重新渲染。


## react中refs的作用是什么？
React.createRef()：用于类组件，每次渲染都会创建新的 ref 对象，通常用于获取 DOM 元素或组件实例。
useRef：用于函数组件，在整个组件生命周期内保持同一个 ref 对象，不仅可以用于获取 DOM 元素，还可以用于存储可变值。

## react中diff原理
把树形结构按照层级分解，只比较同级元素。
列表结构的每个单元添加唯一的 key 属性，方便比较。
React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）
合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty 到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.
选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。

## 受控组件和非受控组件有什么区别？

受控组件：是指其表单数据（如输入框的值）完全由 React 组件的 state 管理。即，表单元素的值受组件的 state 控制，并通过事件处理程序（如 onChange）更新 state。

特点
数据存储在 state 中：表单数据保存在组件的 state 中，组件完全控制表单数据。
即时同步：每次用户输入都会触发 onChange 事件，更新 state，进而更新表单元素的值。
单一数据源：表单数据的唯一数据源是组件的 state，确保了数据的同步和一致性。

非受控组件：是指其表单数据由 DOM 自身管理，React 不直接控制表单元素的值。通常使用 ref 来直接访问 DOM 元素，从而获取其值。

1、数据存储在 DOM 中：表单数据保存在 DOM 元素中，React 通过 ref 间接访问表单数据。
2、手动同步：需要手动获取 DOM 元素的值，并进行相应操作，不会自动同步。
3、分离数据源：表单数据的管理与组件的 state 分离，数据源是 DOM 元素。

区别：就是当输入框时，输入值变化时，state及时更新，非受控组件需要手动获取值（非实时），所以及时的表单验证等操作不适合，有条件的禁用按钮。


## 为什么虚拟DOM会提高性能？

虚拟DOM（内存）  真实DOM（硬盘）

## react项目的创建方式
1、Create-React-App（CRA）  --npx create-react-app my-app --template typescript 
缺点：配置文件封装好了，不易修改，npm run eject可以弹出配置文件（修改麻烦）  craco=>craco.config.js 用于修改默认配置(修改启动方案 start，build，test)
2、从零创建 webapck react 工程
3、vite  npm create vite@latest  （适合代码量大，可以提高代码打包速度）
4、Gatsby：通过 Gatsby 建立的网站，很容易被搜索引擎检索到，而且页面的渲染性能非常好，完美支持个人网站、博客、文档网站，甚至是电子商务网站。
5、Next.js 






## react

<body>
    <div id='root'>
        <h1>nihao</h1>
    </div>
const button = React.createElement('button',{
    onClick:()=>{
        console.log(1)
    }
},"点击")
const div = React.createElement('div',{},button)
type：标签的名称
ReactDOM.createRoot('#root')  创建根容器

root.render(div)  将react元素放在页面中，记住：首次调用时会将root节点中的所有元素全部替换为新创建的元素(<h1>nihao</h1>不会显示)。之后新建的元素进行diff算法对比分析

</body>
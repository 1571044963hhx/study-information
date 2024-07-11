## 说说对 React 的理解？有哪些特性？

组件化的开发模式，不错的性能
丰富的生态，跨平台支持

## 说说 React 生命周期有哪些不同阶段？每个阶段对应的方法是？

## 使用
npx create-react-app react-basic
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

1、createStore可以帮助创建 store
2、store.dispatch 帮助派发 action , action 会传递给 store
3、store.getState 这个方法可以帮助获取 store 里边所有的数据内容
4、store.subscrible 方法订阅 store 的改变，只要 store 发生改变， store.subscrible 这个函数接收的这个回调函数就会被执行

`中间件：主要用于异步操作处理。（对store.dispatch进行改造处理）=>类似于拦截器的思想，同步执行在纯reducer函数中执行。`在 Redux 中，中间件是用于拦截和处理 actions 的函数，允许在 action 发送到 reducer 之前对其进行处理、修改或添加额外的逻辑。

## vue-router
CRA创建项目？


## 说说你对React Router的理解？常用的Router组件有哪些？

react-router等前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面

路由的本质就是页面的URL发生改变时，页面的显示结果可以根据URL的变化而变化，但是页面不会刷新
因此，可以通过前端路由可以实现单页(SPA)应用

react-router主要分成了几个不同的包：

react-router: 实现了路由的核心功能
react-router-dom： 基于 react-router，加入了在浏览器运行环境下的一些功能
react-router-native：基于 react-router，加入了 react-native 运行环境下的一些功能
react-router-config: 用于配置静态路由的工具库

BrowserRouter、HashRouter 一般导入BrowserRouter会重命名为router  <Router>包裹Route使用，但一般不会这么使用，使用createBrowserRouter
Route:用于路径的匹配，然后进行组件的渲染，对应的属性如下：path,component,render,exact开启精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件
Link、NavLink:NavLink作用和link一样，只是添加了一些样式activeStyle：活跃时（匹配时）的样式activeClassName={{color:"red"}}：活跃时添加的class
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
3、createMemoryHistory：用于特殊的内存管理或测试需求，并且不会对浏览器 URL 产生影响。


## 说说React Router有几种模式？实现原理？
hash 模式：在url后面加上#，如http://127.0.0.1:5500/home/#/page1 =>hashHistory：  不需要  兼容性好，支持老版本浏览器。
history 模式：允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录 =>browserHistory：  需要

`hash 值改变，触发全局 window 对象上的 hashchange 事件。`
`所以 hash 模式路由就是利用 hashchange 事件监听 URL 的变化，从而进行 DOM 操作来模拟页面跳转`
history 

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

## jsx是什么？和js有什么区别

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

## redux的工作原理

## react-router的工作原理？react-router-dom有哪些组件

## react hook 解决了什么问题？函数组件和类组件的区别？

## setstate是同步还是异步的？具体作用？

在React中，setState()函数通常被认为是异步的，这意味着调用setState()时不会立刻改变react组件中state的值，
setState通过触发一次组件的更新来引发重绘，多次setState函数调用产生的效果会合并。

setState 是 React 类组件中的一个方法，用于更新组件的状态（state）。每次调用 setState 时，React 会将新的状态与现有状态合并，
并触发一次重新渲染，以便组件能够反映最新的状态变化。有时候，新的状态依赖于前一个状态。这时，可以传递一个函数给 setState，
该函数接收前一个状态作为参数。

## 什么是fiber，解决了什么问题？
Fiber 是 React 16 引入的一种新的协调算法和架构，用来解决在大型应用中遇到的性能问题和可维护性问题。Fiber 的主要目标是提高应用的响应速度，使得界面能够在高负载情况下仍然保持流畅。
1、时间切片
Fiber 将渲染工作分解成更小的任务，并允许在任务之间暂停和恢复。这种机制使得 React 可以将长时间运行的任务分成多个小步骤，以便浏览器有机会在这些步骤之间进行高优先级的工作，比如处理用户输入。
这解决了长时间阻塞主线程的问题，提升了应用的响应性。
2、优先级分配
Fiber 引入了优先级的概念，不同类型的更新任务可以被赋予不同的优先级。比如用户输入相关的更新通常会被赋予更高的优先级，而动画和网络请求相关的更新可能会被赋予较低的优先级。
这使得重要的任务能够尽快得到处理，而非关键任务可以延迟执行，从而改善用户体验。
3、可中断的渲染过程：
传统的递归渲染算法是不可中断的，这意味着一旦开始渲染，就必须一直进行到结束。Fiber 通过将渲染工作分成小块并在需要时暂停，可以中断和恢复渲染过程。
这种方式使得 React 可以在中断渲染时进行其他高优先级的任务，然后再恢复渲染，避免了长时间的主线程阻塞。


## react在哪里捕获错误

## react组件传值有哪些？

## react无状态组件（函数组件）和class类组件的区别
最大的不同：引入hooks（状态管理，生命周期）
类组件是用`ES6`类定义的组件。它继承自 React.Component 类，并且必须实现 render 方法。
1、状态管理：类组件有内置的状态管理机制，通过 this.state 和 this.setState。
2、生命周期方法：类组件可以使用生命周期方法，如 componentDidMount、componentDidUpdate 和 componentWillUnmount。
3、使用 this：类组件使用 this 关键字来访问 props、状态和方法。
4、更冗长：相比函数组件，类组件的语法更冗长，包含构造函数、this 绑定等。

## react如何做到和vue中keep-alive的缓存效果

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
## react中的key的作用是什么？

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





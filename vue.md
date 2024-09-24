## 说说你对 vue 的理解?
Vue.js是一个用于创建用户界面的开源 JavaScript 框架，也是一个`创建单页应用的 Web 应用框架.`

`核心特性：数据驱动模型（MVVM）`
Model:模型层，应用的数据及业务逻辑
View：视图层：负责将数据模型转化为 UI 展示出来，可以简单的理解为 HTML 页面
ViewModel：视图模型层，用来连接 Model 和 View，是 Model 和 View 之间的通信桥梁

理解 ViewModel
它的主要职责就是：

数据变化后更新视图
视图变化后更新数据
当然，它还有两个主要部分组成

监听器（Observer）：对所有数据的属性进行监听
解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

new Vue()首先执行初始化，对 data 执行响应化处理，这个过程发生 Observe 中
同时对模板执行编译，找到其中动态绑定的数据，从 data 中获取并初始化视图，这个过程发生在 Compile 中
同时定义⼀个更新函数和 Watcher，将来对应数据变化时 Watcher 会调用更新函数
由于 data 的某个 key 在⼀个视图中可能出现多次，所以每个 key 都需要⼀个管家 Dep 来管理多个 Watcher
将来 data 中数据⼀旦发生变化，会首先找到对应的 Dep，通知所有 Watcher 执行更新函数

组件化： 1.什么是组件化一句话来说就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式，在 Vue 中每一个.vue 文件都可以视为一个组件 2.组件化的优势
降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体的实现
调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，
是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单
提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级

指令系统
解释：指令 (Directives) 是带有 v- 前缀的特殊属性作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

常用的指令

条件渲染指令 v-if
列表渲染指令 v-for
属性绑定指令 v-bind 单向数据绑定 数据变化引起视图变化，或者使用{{}}
事件绑定指令 v-on
双向数据绑定指令 v-model
没有指令之前我们是怎么做的？是不是先要获取到 DOM 然后在....干点啥

Vue 所有的界面事件，都是只去操作数据的，Jquery 操作 DOM
Vue 所有界面的变动，都是根据数据自动绑定出来的，Jquery 操作 DOM

## Vue 和 React 对比
相同点
都有组件化思想
都支持服务器端渲染
都有 Virtual DOM（虚拟 dom）
数据驱动视图
都有支持 native 的方案：Vue 的 weex、React 的 React native
都有自己的构建工具：Vue 的 vue-cli、React 的 Create React App
区别
数据变化的实现原理不同。react 使用的是不可变数据，而 Vue 使用的是可变的数据
组件化通信的不同。react 中我们通过使用回调函数来进行通信的，而 Vue 中子组件向父组件传递消息有两种方式：事件和回调函数
diff 算法不同。react 主要使用 diff 队列保存需要更新哪些 DOM，得到 patch 树，再统一操作批量更新 DOM。Vue 使用双向指针，边对比，边更新 DOM

## vue2 和 vue3 的对比（vue 的响应式原理是什么？vue3 的响应式有何不同）
1、vue3 在兼顾 vue2 的 options API 的同时还推出了 composition API，大大增加了代码的逻辑组织和代码复用能力
2、Vue3 是基于 typeScript 编写的，提供了更好的类型检查，能支持复杂的类型推导
3、在 vue2 中，我们是通过 mixin 实现功能混合（app.mixin），如果多个 mixin 混合，会存在两个非常明显的问题：命名冲突和数据来源不清晰，而通过 composition 这种形式，可以将一些复用的代码抽离出来作为一个函数，只要的使用的地方直接进行调用即可。
5、组合式 API 没有 this
6、生命周期改变（）
7、vue3 中 v-if 的优先级高于 v-for
8、根实例的创建从 new app 变为了 createApp
9、新增了了传送门 `teleport` 组件：可以将组件的 DOM 结构渲染到指定的目标位置。（一般用于模态对话框，将组件显示在BODY的中间，而不是父组件的中间位置）
10、更小的体积：通过更好的代码分割和 Tree Shaking，使得打包后的体积更小。
11、基于 Proxy 的响应式系统：使用 Proxy 替代 Vue 2.x 中的 Object.defineProperty，解决了 Vue 2.x 中的一些局限性，如无法检测数组索引的变化和对象属性的添加和删除。
12、引入 `Suspense` 组件，可以更好地处理异步组件的加载。有两个默认插槽 <#default>展示需要展示的内容，<#fallback>展示在加载完成之前需要展示的内容，比如骨架屏（vue-content-loader）



数据代理 当有人读取 person 的 age 属性时，get 函数被调用，且返回值就是 age 的值（getter） 当有人修改 age 属性,set 函数被调用，且会收到具体的值
vue.defineProperty(person，"age",{value:18,enumerable:true,writable:true,configurable:true,get:function(){}},set:function(){}) //可删除，可枚举，可修改

数据代理： 数据代理是一种机制，使得我们可以通过一个对象来访问另一个对象的属性。在 Vue 中，数据代理用于将 Vue 实例的属性访问代理到其 data 对象中的属性上。这样一来，我们可以通过直接访问 Vue 实例来访问和修改其数据属性。vm 实例中存在基本数据，但这个数据是属于 data 中的数据，

通过 vm 对象来代理 data 对象中属性的操作（读，写）
优势：更加方便的操作 data 中的数据

`基本原理：通过 object.defineProperty()把 data 对象中所有的属性添加到 vm 上，为每一个 vm 上的属性都指定一个 getter 和 setter，在 getter 和 setter 中去操作 data 中对应的属性。`
`setter-重新解析模板-生成新的虚拟 dom-新旧 dom 对比-更新页面`

总结：vue 将 data 中的数据先加工（做成响应式数据，getter，setter），再保存在实例对象的_data 中，此时模板解析可以{{_data.name}}来使用，但不方便，
因此此处做了一个数据代理，将_data.name 变为 vm.name.基本在于模板中可以直接使用 vue 实例对象的属性。

数据劫持：数据劫持是指在访问或修改对象的属性时，对这些操作进行拦截和监视，以便在属性发生变化时能够触发相关的操作。在 Vue 中，数据劫持用于监听数据的变化，以实现双向绑定和响应式更新
比较典型的有两种方式 object.defineProperty（） 和 es2015 中新增的 proxy 对象。数据的劫持最著名的应用当属双向绑定。

需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题
但此处存在一个问题，使用 vue.defineProperty 数据代理是一个对象时，当对它进行新增和修改不会引起内存地址的变化，并不会检测到该属性发生了变化。

`1.Proxy 性能优于 Object.defineProperty。 Proxy代理的是整个对象，Object.defineProperty只代理对象上的某个属性,如果是多层嵌套的数据需要循环递归绑定; `
`2.对象上定义新属性时，Proxy可以监听到，Object.defineProperty 监听不到，需要借助$set 方法;` 
`3.数组的某些方法(push、unshift 和 splice)Object.defineProperty 监听不到，Proxy 可以监听到;`

function _isObserve(v) {
    return typeof v === 'object' && v !== null
}

function Observe(obj) {
    const proxy = new Proxy(obj, {
        get(target, k) {
            let v = target[k];
            if (_isObserve(v)) {
                v = Observe(v)
            }
            console.log(k,'读取')
            return v
        },
        set(target,k,val){
            if(target[k] !==val){
                target[k] = val
                console.log(k,'更改')
            }
        }
    //在此后面可以加很多函数
    })
    return proxy
}

target：要代理的目标对象，可以是任何类型的对象（包括数组、函数等）。
handler：一个对象，其属性是当执行某种操作时定义代理行为的函数（set,get,has,deleteProperty,apply,construct）

总结：先数据劫持（做成响应式）（在内部使用了 Vue.observable 的函数），再数据代理（方便使用）

双向数据绑定的原理：
1、数据初始化：当创建一个 Vue 实例时，Vue.js 会遍历 data 对象中的所有属性，并使用 Object.defineProperty 或 Proxy 将这些属性转换为“响应式”属性。每个响应式属性都会附带 getter 和 setter。
2、数据劫持：当访问或修改数据时，Vue.js 能够执行额外的逻辑，如依赖收集和通知更新。
3、当组件渲染时，会触发数据的 getter，从而进行依赖收集。Vue.js 会记录当前的“观察者”（如组件的渲染函数）依赖了哪些数据。
4、数据变更检测：当数据被修改时，会触发数据的 setter。Vue.js 会在 setter 中通知所有依赖该数据的观察者，执行更新操作。

## setTimeout 实现 setInterval
function myInterval(fn, time) {
    let context = this;
    setTimeout(() => {
        fn.call(context);
        myInterval(fn, time);
    }, time);
}
`思路：定时器递归，注意保留this，防止this丢失`

## 实现 proxy
function MyProxy(obj, handler) {
    let _target = deepClone(obj);
    Object.keys(_target).forEach(key => {
        Object.defineProperty(_target, key, {
            get: () => handler.get && handler.get(obj, key), //当 handler.get 存在时执行下一步
            set: newVal => handler.set && handler.set(obj, key, newVal),
        });
    });
    return _target;
}

let person = {
    name: 'jack',
    city: 'Beijing',
};

let _target = {
    name: 'jack',
    city: 'Beijing',
};

let proxy = new MyProxy(person, {
    get: (target, propKey) => {
        console.log('读取')
        return target[propKey]
    },
    set: (target, propKey, value) => {
        target[propKey] = value;
    },
});

// test
console.log(proxy.name); // jack
proxy.city = 'Nanjing';
console.log(proxy.city); // Nanjing
console.log(person); // { name: 'jack', city: 'Nanjing' }

## 实现 call
Function.prototype.myCall = function (context, ...rest) {
    context.fn = this;
    var result = context.fn(...rest);
    delete context.fn;
    return result;
}
`思想：将调用的函数加入到需要改变this的对象中调用，之后删除函数并返回结果`

## 实现 apply(后面传递数组参数)
Function.prototype.myApply = function (context, args) {
    context.fn = this;
    let res;
    if (!args){
        res = context.fn();
    } else {
        res = context.fn(...args)
    }
    `注意：！args表示的是没有传递参数，而不是传来了一个空数组`
    delete context.fn;
    return res;
}
`思路：和call实现差不多，注意apply传入的是一个数组，因此形参不需要用展开运算符，但函数调用的时候需要用展开运算符`

## 实现 bind() 传递的参数不是数组 有点类似柯里化
Function.prototype.myBind = function (context, ...args) {
    const self = this;
    return function (...newArgs) {
        return self.apply(context, [...args, ...newArgs]);
    };
};
`思路：利用apply来实现bind，bind需要返回一个函数`

## 柯里化（固定某个函数中的一些参数，得到该函数参数的一个新函数，如果没有剩余参数，则调用）
function curry(targetfn) {
    var numOfArgs = targetfn.length; //形参的个数 5
    return function fn() {
        if (arguments.length < numOfArgs) {
            return fn.bind(null, ...arguments);
        } else {
            return targetfn.apply(null, arguments);
        }
    }
}

function sum(a, b, c, d,e) {
    return a + b + c + d+e;
}

const curried = curry(sum);
console.log(curried(1)(2)(3)(4)(5)) // 6

## 跨域（浏览器同源策略）当两个 URL 的协议，域名，端口任何一方存在不同时，就不能相互通信
1、jsonp 利用 script 标签进行跨域，只能处理 get 请求
2、后端设置 Access-Control-Allow-Origin cors
3、proxy 可以在 vue.config,js 中配置和在 express 服务器中设置。

## vue 中 diff 算法

虚拟 DOM：用 JavaScript 对象来描述真实的 DOM 结构
渲染器：将虚拟 DOM 转为真实 DOM
渲染函数：一个组件要渲染的内容是通过渲染函数来描述的，渲染函数的返回值就是虚拟 DOM
编译器：将模板编译成渲染函数
组件：一组 DOM 元素的封装

const vsnode = {
    tag:'h1',
    props:{
        onClick:handler
    },
    children:[
        {tag:'span'}
    ]
}

<h1 @click="handler"><span></span></h1>

function MyComponent(){
    return {
        tag:'div',
        props:{
            onClick:()=>alert('hello')
        },
        children:'click me!'  
    }
}

`vue渲染的原理（模板的工作原理）：首先将模板里的内容通过编译器编译成渲染函数并添加到<script>标签块的组件对象上，然后渲染器再把渲染函数返回的虚拟DOM渲染为真实的DOM`

<div @click="handler">
    click me
</div>
编译器：render(){
    return h('div',{onClick:handler},'click me')  => render(){return tag:'div',props:{onClick:handler},children:'click me'}
}  h的返回值就是一个对象，让我们编写虚拟DOM更加轻松

声明式：专注于描述程序应该做什么，而不是如何去做。它更关注结果和逻辑关系，而不是具体的执行步骤。比如<button></button>就是一个按钮，可以理解为将 dom 操作给封装了
命令式：采用 dom 操作一步一步走。

`Diff 算法 是一种计算数据结构差异的方法，通常用于虚拟 DOM 的实现中。它的主要目的是高效地找出两个数据结构之间的差异，以便最小化更新的开销。Diff 算法在前端框架（如 React 和 Vue）中用于比较虚拟 DOM 和真实 DOM 的变化，并以最小代价更新真实 DOM。`

`Diff 算法 用于比较新的虚拟 DOM 和旧的虚拟 DOM，找出变化部分，并进行最小化的 DOM 更新。`

1、分层比较：比较两个虚拟DOM树时，算法会逐层进行比较，而不是逐节点进行比较。这样可以减少比较的复杂度。
2、同级比较：只会比较同一层级的节点，不会跨层级进行比较。
3、关键节点（Keyed Nodes）：通过 key 属性来唯一标识节点，从而优化节点移动和复用的情况。

1、树的分割：将整个 DOM 树分割成多个子树，对每个子树分别进行比较。
2、同层节点比较：在同一层级上比较新旧虚拟 DOM 节点，找出差异。
3、关键节点比较：通过 key 属性来唯一标识和比较节点，减少不必要的重新创建和移动节点的操作。
4、节点更新：根据比较结果，最小化地更新真实 DOM。

Diff 算法的复杂度
通过上述的优化策略，Diff 算法的复杂度从 O(n^3) 降低到了 O(n)。这是通过假设两个树结构在大多数情况下只会有少量的变化而实现的。

Diff 算法在 React 中的应用
在 React 中，Diff 算法用于 reconciliation（协调）过程。当组件的状态或属性变化时，React 会创建一个新的虚拟 DOM 树，并将其与之前的虚拟 DOM 树进行比较。根据比较结果，React 会生成一个最小化的操作集合，用于更新真实 DOM。

Diff 算法在 Vue 中的应用
在 Vue 中，Diff 算法同样用于比较新旧虚拟 DOM 树，以最小化更新真实 DOM。Vue 的 Diff 算法和 React 的实现类似，通过对比新旧虚拟 DOM 树来生成最小的操作集合，减少不必要的 DOM 操作。

Diff 算法的优点
高效：减少了不必要的 DOM 操作，提高了性能。
灵活：能够处理复杂的 UI 变化和状态更新。
可扩展：通过 key 属性和其他优化策略，可以进一步提升性能。

## React/Vue 项目中 key 的作用
在 React 和 Vue 项目中，key 属性用于标识列表中每个元素的唯一性。它在 Virtual DOM 的更新过程中扮演了重要的角色，具有以下作用：

两个相同的组件产生类似的 DOM 结构，不同的组件产生不同的 DOM 结构。
同一层级的一组节点，他们可以通过唯一的 id 进行区分。

假设(旧 DOM)A B C D E （新 DOM）A B F C D E
没有 key:A=A,B=B,C!=F,D!=C,E!=D 因此将 C,D,E 节点删除，新增节点 F,C,D,E
有 key:A=A，B=B,C=C,D=D,E=E 新增节点 F 提高效率。

`如果节点类型不同，直接干掉前面的节点，再创建并插入新的节点，不会再比较这个节点以后的子节点了。`
`如果节点类型相同，则会重新设置该节点的属性，从而实现节点的更新。`

需要注意的是，key 属性必须是稳定且唯一的标识符，通常可以使用列表项的唯一标识符（如 id），或者使用索引作为 key（不推荐，除非列表项目没有唯一标识符）。
`当数组重新排序或者增加和删除时索引会发生变化，因此索引不能够充当唯一标识符`
总结起来，key 属性在 React 和 Vue 项目中用于标识列表项的唯一性，它在虚拟 DOM 的更新过程中起到了重要的作用，可以提升性能、维护组件状态，并帮助框架准确识别和更新特定的组件。

## 单页面应用（客户端渲染） ## SSR 解决了什么问题？有做过 SSR 吗？你是怎么做的？(SSR 的实现原理)
单页面应用是一种 Web 应用程序架构，它通过动态重写当前页面，而不是从服务器加载整个新页面，实现用户在应用程序中的无缝体验。
SPA 的主要特点是页面只在初次加载时从服务器请求一次，之后所有的交互和数据请求都通过 AJAX 或者其他异步请求来处理。

1、单一 HTML 文件：初次加载时，服务器只返回一个 HTML 文件。后续的页面内容更新通过 JavaScript 动态加载和渲染。
2、无刷新页面更新：通过 JavaScript 和 AJAX 请求，动态更新页面内容而无需重新加载整个页面。URL 路由变化时，不会导致页面刷新。
3、客户端渲染：大部分渲染逻辑在客户端执行，服务器主要提供 API 接口返回数据。通过 JavaScript 框架（如 React、Vue、Angular）来管理页面状态和视图。
4、响应式和交互性强：提供类似桌面应用的用户体验，交互更加顺畅。页面加载速度更快，减少了重新加载页面的时间

单页面应用的优势
1、用户体验好：页面切换快，响应时间短。动态内容加载减少了不必要的页面刷新。
2、开发效率高：前后端分离开发，后端提供 API，前端负责渲染。代码重用性高，可以更好地组织和管理代码。
3、减少服务器负载：通过缓存和前端渲染，减少了服务器的渲染压力。只需提供数据接口，减少了 HTML 页面生成的开销。

单页面应用的劣势（SSR 的优势）
1、首次加载时间长：初次加载时需要加载所有必要的 JavaScript 和 CSS 文件，可能导致加载时间较长。
2、SEO 不友好：由于内容是通过 JavaScript 动态加载的，搜索引擎抓取困难。可以通过服务端渲染（SSR）或预渲染技术改善。
3、复杂性增加：需要处理更多的前端逻辑和状态管理。路由管理、状态管理、数据同步等可能增加应用的复杂性。

`如何实现SSR:比如直接在express框架里面返回基本结构和初始化数据`

## vue 的生命周期
vue2 -------> vue3
beforeCreate --------> setup(()=>{})
created --------> setup(()=>{})
beforeMount --------> onBeforeMount(()=>{})
mounted --------> onMounted(()=>{})
debugger
beforeUpdate --------> onBeforeUpdate(()=>{})
updated --------> onUpdated(()=>{})
beforeDestroy --------> onBeforeUnmount(()=>{})
destroyed --------> onUnmounted(()=>{})

activated --------> onActivated(()=>{})
被包含在 <keep-alive> 中的组件，会多出两个生命周期钩子函数，被激活时执行；一般用在路由组件之间的相互切换。
deactivated --------> onDeactivated(()=>{})

比如从 A 组件，切换到 B 组件，A 组件消失时执行；
errorCaptured --------> onErrorCaptured(()=>{})当捕获一个来自子孙组件的异常时激活钩子函数。

## vue 的组件通信方式和原理

## vue 的路由实现，hash 路由和 history 路由实现原理

## v-if 和 v-show 的区别（为什么 Vue 中的 v-if 和 v-for 不建议一起用?）
v-if：创建和删除 dom 节点
v-show：只是通过 display：none 隐藏起来 `回流`

初次加载（加载次数很少的时候）：v-if（比如当我鼠标移上去的时候才加载，有时候可能始终没有移上去，就不需要加载了） v-show 频繁切换

vue2 中：v-if 的优先级低于 v-for 先循环再逻辑判断，但当 v-if 为 false 时，v-for 就白做了
vue3 中：v-if 高于 v-for

## keep-alive 的常用属性和实现原理（怎么缓存当前的组件？缓存后怎么更新？说说你对 keep-alive 的理解是什么？） react 如何做到和 vue 中 keep-alive 的缓存效果
keep-alive 可以实现组件缓存，当组件切换时不会对当前组件进行卸载，可用于保存状态，比如输入框的值。（路由的切换，回到鼠标滚动条的位置）
常用的两个属性 include/exclude，允许组件有条件的进行缓存。此时需要给组件指定 name 属性 max 属性：最大储存组件个数，超过个数最久访问的被移除。
onActivated(() => {
// 调用时机为首次挂载
// 以及每次从缓存中被重新插入时
})
onDeactivated(() => {
// 在从 DOM 上移除、进入缓存
// 以及组件卸载时调用
})

`缓存后如何获取数据`:利用生命周期函数 onActivated 组件激活执行，组件（局部）导航守卫，beforeRouteEnter 组件渲染执行

1、react-activation 第三方库
2、使用 React 的状态管理和条件渲染：通过条件渲染和 useRef 保存组件实例，确保组件不会被销毁，从而实现类似于 Vue 中 keep-alive 的效果。

## 导航守卫（可以理解为 axios 中的拦截器）=>可以全局或者单独路由配置
全局前置守卫：beforeEach((to, from, next)=>{}) 跳转之前获取 token，导航到登录页面，进度条开始，退出登录删除 token next()正常导航使用下一个前置守卫，还可用于重定向和取消导航 next（false）
全局解析守卫：beforeResolve 解析守卫刚好会在导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用。是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。
全局后置守卫：afterEach() 进度条结束 导航成功

组件（局部）导航守卫，在组件内部使用，比如数据的获取
beforeRouteEnter
beforeRouteUpdate
beforeRouteLeave

beforeRouteEnter(to, from, next){
next(vm=>{
console.log(vm)
// 每次进入路由执行
vm.getData() // 获取数据
})
},

## vue 组件中 data 为什么必须是函数
1、防止数据污染
Vue 组件是通过构造函数创建的，每个组件实例都是一个新的对象实例。如果 data 是一个对象而不是函数，那么这个对象将在所有组件实例之间共享。这会导致一个组件实例修改 data 时，
其他实例的 data 也会被修改，造成意外的副作用。比我我注册一个组件，当我在很多地方使用的时候就会创建很多组件实例。
通过将 data 定义为一个函数，每次创建新的组件实例时，都会调用这个函数返回一个新的对象。这确保了每个组件实例都有自己独立的 data 对象，互不干

[react]
React 组件有两种主要方式：函数组件和类组件。在类组件中，状态是通过 this.state 定义的，这是类组件实例化的一部分。就是每一个状态属性是挂在实例的对象上的，而不是类上。

## vue 和 react 的区别

## 说一下 watch，computed，method 的区别？以及使用场景
computed：计算`属性`,具备缓存功能，当依赖的值没有变化时，一直保留原有的值。最开始会返回一个值（不管是否发生变化） 计算总价
method：没有缓存
watch:监听，只有当数据发生变化时才会执行，一般用于执行副作用，如异步获取数据等
watch 支持异步，computed 不支持；
watch 是一对多（监听某一个值变化，执行对应操作）；computed 是多对一（监听属性依赖于其他属性）
watch 监听函数接收两个参数，第一个是最新值，第二个是输入之前的值；

useMemo：用于缓存计算结果，只有在依赖项变化时才会重新计算。
useCallback：用于缓存函数定义，只有在依赖项变化时才会重新创建函数。
useEffect 用于处理副作用，类似于 watch。

## vue 的修饰符有哪些（表单，事件，键值）
表单：针对 v-model：trim 删除首空格字符，lazy 在我们填完信息，光标离开标签的时候，才会将值赋予给 value，number 自动将用户的输入值转为数值类型，转不了返回原来的值
事件：stop 阻止事件冒泡（event.stopPropagation），prevent 阻止事件默认行为（event.preventDefault）表单的提交或超链接的跳转，
self 只当在 event.target 是当前元素自身时触发处理函数，once 只触发一次

passive
在移动端，当我们在监听元素滚动事件的时候，会一直触发 onscroll 事件会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给 onscroll 事件整了一个.lazy 修饰符
传统的事件监听器在事件触发时，会先执行事件处理函数，然后再决定是否阻止事件的默认行为（如阻止滚动）。这会导致性能问题，因为浏览器需要等待 JavaScript 执行完成后才能继续处理其他任务，如滚动页面。使用 .passive 修饰符可以告诉浏览器，事件处理函数不会阻止事件的默认行为，这样浏览器就不需要等待 JavaScript 执行完成，可以立即进行其他任务。这可以提高页面的滚动性能，尤其是在移动端设备上。
需要注意的是，当使用 .passive 修饰符时，你不能在事件处理函数中调用 event.preventDefault() 来阻止事件的默认行为，因为浏览器会忽略这个调用。如果需要阻止默认行为，可以使用 .prevent 修饰符，但这不会带来性能优化。

`补充：scroll只要滚动条向指定方向还有移动的空间，无论什么方式使得滚动条滚动，都能触发scroll事件，wheel只要鼠标滚动了就可以触发，不管是否真的滚动了`

passive 会告诉浏览器你不想阻止事件的默认行为

键盘：<input type="text" @keyup.keyCode="shout()"> enter、tab、delete、space、esc

## 如何实现 vue 中的项目优化
一、编码阶段
1、尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的 watcher
2、v-if 和 v-for 不能连用（vue2中）
3、如果需要使用 v-for 给每项元素绑定事件时使用事件代理
4、SPA 页面采用 keep-alive 缓存组件
5、在更多的情况下，使用 v-if 替代 v-show
6、key 保证唯一
7、使用路由懒加载、异步组件
8、防抖、节流
9、第三方模块按需导入
10、长列表滚动到可视区域动态加载
11、图片懒加载
12、对于静态内容，可以使用 v-once 指令进行一次性渲染。

二、SEO 优化
预渲染
服务端渲染 SSR

三、打包优化
压缩代码
Tree Shaking/Scope Hoisting
使用 cdn 加载第三方模块
多线程打包 happypack
splitChunks 抽离公共文件
sourceMap 优化

四、用户体验
骨架屏
PWA

还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启 gzip 压缩等。


## vue 中 spa 应用如何优化首屏加载速度（SPA（单页应用）首屏加载速度慢怎么解决?）
1、按需加载（异步组件） 只有当组件需要渲染的时候再加载，比如当点击按钮时显示
import AsyncComp from './components/MyComponent.vue' =>同步加载
const AsyncComp = defineAsyncComponent(() => =>异步加载
import('./components/MyComponent.vue')
)

2、减小入口文件积
3、静态资源本地缓存
4、UI 框架按需加载
5、图片资源的压缩
6、组件重复打包
7、开启 GZip 压缩
8、使用 SSR

`动态组件`
<component :is="Foo" /> 使用 Foo 组件
<component :is="someCondition ? Foo : Bar" /> 根据 someCondition 的值判断使用哪个组件



## ref 的作用
1、ref 的作用是被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。其特点是：

如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素
如果用在子组件上，引用就指向组件实例

直接赋值使用ref不管基本还是对象,修改数据 ref 和 reactive 都可以，当是对象时，本质上 ref 就是通过调用 reactive 来实现的。

shallowRef：放弃深层次的响应式
shallowReactive:

ref:函数参数可以是基本数据类型，也可以接受对象类型  
reactive:一般针对对象类型

`理解：reactive的实现是通过proxy来实现的，但proxy不能接受非对象类型作为参数，因此进一步对reactive进行封装，在里面封装了seteer和getter方法，当使用ref封装对象时，本质上ref就是通过调用reactive来实现的`

https://www.bilibili.com/video/BV1cC411b76D/?spm_id_from=333.337.search-card.all.click&vd_source=a8bd5ebbc2cb9b105d8d2576ac67d0c3 源码分析


## 说说对 nexttick 的理解
等待下一次 DOM 更新刷新的工具方法。

当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。

就比如我写一个计数器，1-1000，不可能没改变一次就渲染一次
nexttick(()=>{在里面获取元素}) 或者 nexttick() 在后面获取 dom 元素

## 你有写过自定义指令吗？自定义指令的应用场景有哪些？

在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令。

<!-- 只有当所需功能只能通过直接的DOM操作来实现时，才应该使用自定义指令.
其他情况下应该尽可能地使用v-bind这样的内置指令来声明式地使用模板，这样更高效，也对服务端渲染更友好。 -->

使用：
app.directive('focus', {
/_ ... _/里面提供了很多钩子函数，主要的逻辑再这里执行，钩子函数中有默认参数，如 el,因此可以操作 dom
})
`注意：如果需要全局注册使用，可以定义一个函数包裹，函数参数接受app对象作为参数，并在main.ts文件中引入使用。`

created：在绑定元素的 attribute（属性） 前
beforeMount：在元素被插入到 DOM 前调用
mounted：
beforeUpdate：
updated：
beforeUnmount：
unmounted：

el：指令绑定到的元素。这可以用于直接操作 DOM。
binding:一个对象，包含以下属性
value:传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。

根据不同权限控制 button 按钮的显示与隐藏
后端返回不同角色对应的不同权限的指令信息，不同节点发送自身的信息，如果该角色存在该按钮权限，则保留，否则删除该节点。（需要后端的配合）
`el.parentNode.removeChild(el)移除节点,一般只能移除子节点，因此我们需要找到该节点的父节点，再移除父节点中的指定子节点（el）`
采用递归展示路由导航组件，根据不同一级路由拥有多少个子路由，当小于且等于一个时，正常展示，当大于一个时，将子路由（二级路由的数据再次传递给组件，组件再次走最开始的步骤，
判断子路由是否还有子路由，子路由拥有的子路由的个数，此处需要原始组件的名称，因此需要 vue2 的写法，再加上一个 script 标签命名，用该名字进行展示，传递数据，递归）
图片的懒加载 v-lazy

## Vue 中给对象添加新属性界面不刷新?
vue2 是通过 object.defineproperty 将数据设置为响应式，因此新增属性界面不会改变
vue3 通过 new proxy 设置数据为响应式，因此界面会刷新。

## Vue 中组件和插件有什么区别
组件：是可重用的 Vue 实例，可以包含模板、逻辑和样式，用于构建用户界面的一部分。组件是 Vue 应用程序的基本构建块。app.commonent
插件：是一个扩展 Vue 功能的机制，通常用于为 Vue 添加全局功能。例如，全局方法或属性、全局指令、混入、过滤器等（需要安装的）。app.use

## Vue 项目如何部署？有遇到布署服务器后刷新 404 问题吗？

## 你是怎么处理 vue 项目中的错误的？
后端接口错误：通过响应拦截器进行拦截，服务端的响应码 4 开头
代码中本身逻辑错误：

1、try,catch
2、app.config.errorHandler
3、全局前置守卫 针对路由错误
4、errorCaptured 生命周期函数 当捕获到一个来自子孙组件的错误时被调用

## Vue 实例挂载的过程中发生了什么?
1、初始化阶段：Vue 实例开始初始化，处理数据监听(data observer)、计算属性(computed properties)，以及方法(methods)等选项。
2、编译模板：如果提供了模板，这个模板会被编译成渲染函数。如果没有提供模板但指定了挂载元素，Vue 会将挂载元素的 HTML 当作模板来编译。
3、创建 render 函数：无论是编译模板还是用户提供了 render 函数，Vue 都需要一个 render 函数来生成虚拟 DOM。
4、触发 beforeMount 钩子：在挂载开始之前，相关的 beforeMount 生命周期钩子将被调用。
5、虚拟 DOM 的创建与渲染：Vue 通过 render 函数生成虚拟 DOM，并调用渲染器将虚拟 DOM 渲染为真实 DOM。
6、DOM 替换或插入：生成的真实 DOM 将替换挂载元素，或者插入到挂载元素中。
7、触发 mounted 钩子：一旦完成 DOM 插入，mounted 生命周期钩子将被调用，表明挂载过程结束。
8、整个挂载过程是 Vue 实例从开始创建到最终渲染完成的过程，它作为 Vue 的生命周期的一个部分，确保了组件按照既定的方式被正确编译和渲染到页面上。

## Vue3.0 所采用的 Composition Api 与 Vue2.x 使用的 Options Api 有什么不同？
1、在逻辑组织和逻辑复用方面，Composition API 是优于 Options API
2、因为 Composition API 几乎是函数，会有更好的类型推断（更支持 typescript）。
3、Composition API 对 tree-shaking（webpack） 友好，代码也更容易压缩
4、Composition API 中见不到 this 的使用，减少了 this 指向不明的情况
5、如果是小型组件，可以继续使用 Options API，也是十分友好的

这是组合式 API 的生命周期函数
这意味着与普通的 <script> 只在组件被首次引入的时候执行一次不同，<script setup> 中的代码会在每次组件实例被创建的时候执行。

## 说说 Vue 3.0 中 Treeshaking 特性？举例说明一下？

## 图片懒加载
1、lazyload 插件 内部封装了 v-lazy 自定义指令 （其实就是先将路径放到 data-src 中，到一定时机传给 src 属性）
2、IntersectionObserver（浏览器提供的构造函数）
这个构造函数的作用是它能够观察可视窗口与目标元素产生的交叉区域。简单来说就是当用它观察我们的图片时，
当图片出现或者消失在可视窗口，它都能知道并且会执行一个特殊的回调函数。
在自定义指令中 mounted 中实例化该函数，因为需要拿到对应元素的 dom 里面的图片路径，当进入可视化窗口区域后，将该路径传给图片的 src 属性。
3、滚动监听+scrollTop+offsetTop+innerHeight（滚动一次会监听很多次，因此需要节流处理）
`注意：v-bind:src=""的简写:src=""双引号里面传递的是一个表达式，可以这么理解指令里面传递的是表达式，因此自定义执行传递字符串时就需要再加一个单引号`

`判断是否在可视范围区域内`
function isInViewport(element) {
  // 1. 获取元素的位置信息
  const rect = element.getBoundingClientRect();

  // 2. 获取视口的尺寸信息
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // 3. 判断元素是否在可视区域内
  // 判断条件：元素的 top, left, bottom, right 是否都在视口的边界内
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= viewportHeight &&
    rect.right <= viewportWidth
  );
}
`具体属性介绍：top:元素最顶部的距离到浏览器顶部视口的距离。bottom：元素最底部的距离到浏览器顶部视口的距离`
`注意：当元素在上面视口区域消失后，bottom和top的值会变成负数，rect的值还有其它属性width,height,x,y(右上角的坐标)`

## 生成器（可迭代对象）
可迭代对象：即对象（或其原型链中的对象）有一个被命名为 Symbol.iterator 的属性，并且该属性是一个返回迭代器对象的方法。arr[Symbol.iterator]
生成器：调用生成器函数返回一个迭代器。迭代器中含有 next 方法。

如果一个对象需要变成可迭代的对象
1、需要在对象的原型上添加 Symbol.iterator 属性（这个属性的值是一个函数），即 Object.prototype[Symbol.iterator] = function(){}
2、该函数调用的结果为一个迭代器 `思路：可迭代对象中包含[Symbol.iterator]属性，且这个属性调用的结果也是迭代器，因此可以将对象中的值生成一个可迭代的对象，再将里面的迭代器取出来赋值给该对象`

Object.prototype[Symbol.iterator] = function(){
    return Object.values(this)[Symbol.iterator]()
}

或者考虑生成器对象：
Object.prototype[Symbol.iterator] = function*(){
    yield* Object.values(this)
或者
for (let i of Object.values(this)){
    yield i
}
}
const [a,b] = {a:3,b:4} 数组解构的本质就是要求右边是一个可迭代的对象。
可迭代对象：arr,str,nap,set,arguments,nodelist object 不可迭代（因此不能使用 for of 遍历,可以使用 for in 循环遍历）


## 文件上传
FileReader对象：用于读取File或Blob对象的内容。它可以将文件读取为文本或数据URl（base64 编码的字符串）。
存在一个方法readDataUrl(),可以将数据转换为base格式的字符串，该字符串可以直接放入src中实现预览。
`注意：File和Blob数据只是保存了文件的基本信息，如大小size,type,name等数据，如果需要拿到里面的数据则需要通过FileReader对象`
FormData对象：用于构造一组键值对，以便轻松地构建 multipart/form-data 格式的数据，常用于文件上传。

multer: 是一个用于处理 multipart/form-data（不同种类的文件上传）的中间件，通常用于处理文件上传。
window.location.reload();  刷新页面window可以省略  history.go(0);


总结：
前端：
一、点击上传文件，获取需要上传文件的信息 change事件对应的event.target.files(多个文件数组)
二、创建 FormData 对象，将文件和其他相关数据添加到 FormData 对象中。
const formData = new FormData();
formData.append('file', file);  file:定义名字，file：需要上传的文件
formData.append('username', 'exampleUser'); // 添加其他数据（我个人没有补充）
三、发送 AJAX 请求：使用 fetch 或 axios 等库发送 POST 请求，将 FormData 对象作为请求体。

后端：
1、使用 multer 中间件处理文件上传：配置 multer 来处理多部分表单数据，并将文件存储到指定目录。
2、处理文件上传请求：在路由中使用 upload.single('file') 中间件来处理单个文件上传。在处理请求的回调函数中，访问 req.file 获取上传的文件信息，访问 req.body 获取其他表单数据。
3、计算和遍历文件的哈希值，不用重复储存
4、如果文件上传失败，及时删除已上传的文件，释放存储空间。

计算哈希值：增量算法：由于大文件上传的文件过大，计算文件的哈希值需要拿到文件的所有数据才能计算，因此考虑增量算法
先拿到一部分数据计算哈希值，删除相对应的数据，再拿到下一部分的数据和前一部分的哈希值一起计算得到新的哈希值。

## vue3.5的最新更新
1、新增了一个useID的API，使用该API可获得组件的唯一标识，字符串类型
2、新增了一个useTemplateRef的API，使用该API替代ref获取dom节点，
const h1 = useTemplateRef('h1') 里面'h1'必须和ref="h1"相同
const h2 = ref(null)
3、props响应式的修改，一般来说props是响应式的，但解构出来的数据会丢失响应式，因此一般需要使用torefs使其保持响应式(const { count } = toRefs(props);)，目前修改了这个缺陷。


`补充：watch和watchEffect的区别：`
1、watchEffect监听更彻底，只要在里面涉及到的属性全部监听，也就是只有一个回调函数,但不能开启深度监视。
2、watchEffect在初始化的过程中自动执行一次。
3、watch提供修改前后的值，watchEffect不提供变化前后的值。
watch可以转化watchEffect，设置相应参数{ immediate: true }，{ once: true }

`补充：toRef和toRefs的区别`
let age = toRef(obj,'age')
let {age,name} = toRefs(obj)

## 光标跟随移动和输入框高度自定义

### 1、输入框高度自定义
const handleChange = (e: any) => {
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
}
只要输入框里面的内容改变就触发该函数，先让输入框高度自适应，也就是当删除的时候高度减少，再获取滚轮的高度将其赋值给输入框的高度即可。

### 2、光标跟随移动
const getLastTextNode = (dom) => {
    if (!dom) return null;  // 增加空值检查，如果 `dom` 为空，则直接返回 null，防止错误
    const children = dom.childNodes;  // 获取传入的 `dom` 的所有子节点
    for (let i = children.length - 1; i >= 0; i--) {  // 从最后一个子节点开始遍历（倒序遍历）
        const node = children[i];  // 获取当前遍历的子节点
        if (node.nodeType == Node.TEXT_NODE && /\S/.test(node.nodeValue)) {  
            // 如果该节点是文本节点 (nodeType == TEXT_NODE) 且内容中包含非空白字符
            node.nodeValue = node.nodeValue.replace(/\s+$/, '');  // 去除文本末尾的空白字符
            return node;  // 返回找到的文本节点
        } else if (node.nodeType == Node.ELEMENT_NODE) {  
            // 如果该节点是一个元素节点（例如 <div>, <p> 等）
            const last = getLastTextNode(node);  // 递归调用函数，继续查找当前元素节点的子节点
            if (last) return last;  // 如果在子节点中找到最后的文本节点，返回它
        }
    }
    return null;  // 如果没有找到有效的文本节点，则返回 null
}

const updateCursor = async () => {
    await nextTick()  // 确保DOM已经渲染完成
    const contentDom = contentRef.value
    const lastText = getLastTextNode(contentDom)
    const textNode = document.createTextNode('\u200b') // 插入临时文本节点，用于计算光标位置,零宽度空格字符

    if (lastText) {
        lastText.parentElement.appendChild(textNode)
    } else {
        contentDom.appendChild(textNode)
    }

    const domRect = contentDom.getBoundingClientRect()  // 获取容器的位置信息
    const range = document.createRange()
    range.setStart(textNode, 0)
    range.setEnd(textNode, 0)

    const rect = range.getBoundingClientRect()  // 使用range计算文本节点位置
    pos.x = rect.left - domRect.left
    pos.y = rect.top - domRect.top

    // 获取当前行的 `font-size`
    const computedStyle = window.getComputedStyle(textNode.parentElement);
    const fontSize = computedStyle.getPropertyValue('font-size');
    cursorHeight.value = parseInt(fontSize, 10);  // 更新光标的高度

    textNode.remove()  // 删除临时文本节点
}

.cursor {
    left: calc(v-bind('pos.x') * 1px);
    top: calc(v-bind('pos.y') * 1px);
    height: calc(v-bind('cursorHeight') * 1px);
}

## vue和react的区别







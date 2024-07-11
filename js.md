## 垃圾回收机制（内存泄漏）

内存的生命周期：
内存分配：当我们声明函数，变量等，系统会自动为他们分配内存
内存使用：读写操作，使用变量函数
内存回收：使用完毕，由垃圾回收机制自动收回不再使用的内存

说明：全局变量一般不会回收，局部变量的值不再使用了会被自动回收掉

内存泄漏：程序中分配的内存由于某种原因程序未被释放或无法释放

1、栈：由操作系统自动分配释放
2、堆：一般由程序员释放，否则由垃圾回收机制回收。

算法说明：
1、引用计数法（IE）=>如果在一个函数里面两个对象相互引用，则不能释放内存，造成内存泄漏。不存在引用就进行回收
2、标记清楚法：
1、标记不再使用的对象改为无法到达的对象
2、从 JS 全局对象出发定时扫描内存中的内容，凡是能从根部到达的对象，都是需要使用的。
3、那些不再从根部无法触及的标记为不再使用，稍后进行回收

1、当一个变量在没有使用 var, let, 或 const 关键字的情况下被声明时，它会自动成为全局变量，无法被垃圾回收器回收。
function leak() {
leakedVar = "I am a leaked variable"; // 应该使用 var, let 或 const
}
2、被遗忘的计时器或回调，需要清除定时器
3、闭包
4、在函数内部循环引用
5、没有清理对 DOM 元素的引用同样造成内存泄露
const refA = document.getElementById('refA');
document.body.removeChild(refA); // dom 删除了
console.log(refA, 'refA'); // 但是还存在引用能 console 出整个 div 没有被回收
refA = null;
console.log(refA, 'refA'); // 解除引用

使用 let 或 const 声明变量，避免全局变量。
小心使用闭包，确保不再需要的闭包能被垃圾回收。
在不需要时清除定时器和事件监听器。
移除 DOM 元素时也要确保没有残留的引用。
避免循环引用，特别是在处理复杂的数据结构时

## 闭包

（1）有外层函数嵌套内层函数；
（2）内层函数使用外层函数的局部变量；
（3）内层函数返回外部，并且被全局变量保存。
作用：实现数据的私有，外部可以使用内部函数的变量
风险：可能会导致内存的泄露
function outer (){
let i = 0
return function inner(){
i++;
console.log(i)
}
}
const fun = outer() => fun = function inner(){}
注意：由于全局定义了 fun = function inner(){}，所以 inner 一直存在，inner 函数使用了 i，i 一直存在。

## 作用域和作用域链（执行上下文和执行栈的理解）

全局作用域：
局部作用域：（块级作用域、函数作用域）
作用域链：变量查找机制，会优先查找当前作用域的变量，再逐级向上查找

## 构造函数以及 new 操作符具体的作用(##说说 new 操作符具体干了什么？)

1、创建对象的三种方式：const obj = {} const obj = new Object() const obj = new OBJ()=>构造函数的方式 （class 类创建）
2、构造函数：特殊的函数，主要用来初始化对象，可以用来创建多个类似的对象
约定：一般 new 关键词实例化，首字母大写
说明：没有参数时可以省略（）、函数内部不需要使用 return，返回值为新创建的对象
1、创建一个新的空对象
2、构造函数的 this 指向新对象 =>将对象与构建函数通过原型链连接起来
3、执行构造函数，修改 this，添加新的属性 =>将构建函数中的 this 绑定到新建的对象 obj 上
4、返回新的对象 =>根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

new 通过构造函数 Person 创建出来的实例可以访问到构造函数中的属性
new 通过构造函数 Person 创建出来的实例可以访问到构造函数原型链中的属性（即实例与构造函数通过原型链连接了起来）

构造函数中返回一个原始值，然而这个返回值并没有作用
注意：构造函数如果返回值为一个对象，那么这个返回值会被正常使用（一般不返回）
function Test(name) {
this.name = name
console.log(this) // Test { name: 'xxx' }
return { age: 26 }
}
const t = new Test('xxx')
console.log(t) // { age: 26 }
console.log(t.name) // 'undefined'

手写 new 操作符：
function mynew(Func, ...args) {
// 1.创建一个新对象
const obj = {}
// 2.新对象原型指向构造函数原型对象
obj.**proto** = Func.prototype
// 3.将构建函数的 this 指向新对象
let result = Func.apply(obj, args) //apply 接受的参数为数组方式,如果 Func 里面包含 return 1，按照 new 关键词是没有作用，正常返回。但此处 result=1
// 4.根据返回值判断
return result instanceof Object ? result : obj =>  
}

## 原型和原型链

1、构造函数通过原型分配的函数是所有对象共享的（节省内存）
2、每一个构造函数都有一个 prototype 属性，指向一个对象，一般称为原型对象
3、构造函数个原型中的 this 都指向实例化对象

Func.prototype.constructor === Func

## 深浅拷贝 =>只针对引用数据类型

浅拷贝：只能拷贝一层数据（展开运算符，object.assign）
object.assign(),只会将拷贝的所有属性值到新的对象中，如果属性值是对象的话，拷贝的是地址。
深拷贝：拷贝多层数据（）
1、递归实现
function deepCopy(obj) {
if (typeof obj !== 'object' || obj === null) return obj; // 非对象或 null 直接返回
let result = Array.isArray(obj) ? [] : {}; // 根据是对象还是数组来初始化 result
for (let key in obj) {
//里面的 key 是字符串
if (obj.hasOwnProperty(key)) {
result[key] = deepCopy(obj[key]); // 递归拷贝
}
}
//深拷贝一般只拷贝自身的属性
return result;
}
`补充：由于for in会遍历整个对象的原型链的所有可枚举的属性，因此需要hasOwnProperty判断是否为自身属性。for of不会`
2、js 数据包实现 lodash 库中的 cloneDeep 函数
3、JSON.parse(JSON.stringify()) JSON.stringify()将对象转换为 JSON 格式，也就是字符串类型，储存在栈里面。
`缺点：会忽略undefined,symbol.`

## 异常处理
1、throw 抛出异常 throw new Error('用户没有传递参数') 会终止程序
2、try/catch/finally catch 捕获错误，但不会终止程序，把可能出现错误的代码写入 try 里面
3、debugger 关键字（打断点）

## this 指向
1、普通函数的 this 指向调用者
定时器的完整写法 window.setTimeout(()=>{},1000) 严格模式下没有调用者时 this 指向 undefined
2、箭头函数不存在 this，指向最近作用域的 this
最好不要在构造函数，原型函数，dom 事件函数中使用

## 防抖和节流
防抖：在规定时间内执行函数，则取消上一次执行，下次执行重新计时。(输入框的表单验证，百度查询，淘宝添加商品数量)
1、手写防抖函数
2、利用 lodash 库中的 debounce 函数

节流：在规定时间内不执行函数(滚动事件，拖拽，角色移动，按钮事件)
1、手写节流函数
2、利用 lodash 库中的 throttle 函数
举例：视频播放器当下次播放时为前一次播放的位置。
1、利用 ontimeupdate()事件，每隔一秒钟，就记录当前时间到本地存储 localstorage.getItem
ontimeupdate()事件：只要进度条移动就触发该事件，但该事件一秒内触发多次，我们只需要一秒之内触发一次即可
2、下次打开页面。onloaddate 时间触发，就可以从本地存储时间，让视频从取出的时间播放
3、获得当前时间 video.currentTime



## javascript 中的数据类型？区别？（typeof 和 instanceof）(判断数组的方式有哪些？)

基本数据类型(储存在栈里面)
1 Boolean
2 null :表示“无”的值，它只有一个值：null。
3 undefined
4 Number
5 BigInt :用于表示大于 2^53 - 1 的整数。
6 String
7 Symbol:是一种唯一且不可变的数据类型，通常用作对象属性的键。const sym2 = Symbol.for('description');可选的描述字符串，用于标识符的描述.

对象数据类型（存储在堆里面）

typeof:布尔值，字符串，数字以及 undified 和函数 typeof 3 === 'number' typeof fun === 'function'
instanceof:能够判断引用数据类型 {} instanceof Object === true
console.log(Object.prototype.toString.call(1)) // [object Number]
console.log(Object.prototype.toString.call(1n)) // [object BigInt]
console.log(Object.prototype.toString.call('123')) // [object String]
console.log(Object.prototype.toString.call(true)) // [object Boolean]
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(null)) // [object Null]
console.log(Object.prototype.toString.call({})) // [object Object]
console.log(Object.prototype.toString.call([])) // [object Array]
console.log(Object.prototype.toString.call(function a() { })) // [object Function]
console.log(Object.prototype.toString.call(Symbol())) // [object Symbol]
console.log(Object.prototype.toString.call(Math)) // [object Math]
console.log(Object.prototype.toString.call(JSON)) // [object JSON]
console.log(Object.prototype.toString.call(new Date())) // [object Date]
console.log(Object.prototype.toString.call(new RegExp())) // [object RegExp]
console.log(Object.prototype.toString.call(new Error)) // [object Error]
console.log(Object.prototype.toString.call(window)) // [object Window]
console.log(Object.prototype.toString.call(document)) // [object HTMLDocument]

1、instanceof，Object.prototype.toString.call，Array.isarray

## JavaScript 数组（字符串）中常用的方法有哪些？

数组：pop(),shift(),unshift(),push(),slice(),splice(),trim(),flat(),join(),concat(),includes(),sort(),indexOf(),find(),filter(),reverse(),
some(),every(),map(),forEach(),reduce(),fill(),entires(),keys(),values()
`forEach()方法会针对每一个元素执行提供的函数，对数据的操作会改变原数组，该方法没有返回值`
`map()方法不会改变原数组的值，返回一个新数组，新数组中的值为原数组调用函数处理之后的值`

字符串：split(),sbuString,subStr(),replace(),toLowerCase(),toUpperCase(),charAt(),indexOf(),match(),search(),concat(),repeat(),slice(),substring(),substr()
slice(): 使用索引范围截取字符串，支持负数索引。
substring(): 使用索引范围截取字符串，不支持负数索引，会自动调整参数顺序。
substr(): 使用起始索引和截取长度截取字符串，支持负数索引。
match():返回一个数组，包含匹配`正则表达式`的所有结果，或者如果没有匹配，则返回 null，里面填正则表达式//ig
search():返回匹配`正则表达式`的第一个子串的起始索引。如果没有找到匹配项，则返回 -1
replace():返回一个新的字符串，其中的一个或所有匹配的模式已被替换为替换文本。该模式可以是`字符串或正则表达式`，替换文本可以是字符串或函数

`公共方法：concat(),indexOf(),slice(),`

## JavaScript 中的类型转换机制

显示类型转换：String(123)='123',123.toString()='123',Number('123') = 123,parseInt(),`parseFloat()将字符串转为浮点数`,Boolean(),等
隐式类型转换：比较运算（==、!=、>、<）、if、while 需要布尔值地方算术运算（+、-、\*、/、%）
1、使用加号（数字和字符串拼接为字符串）,其它数学运算符转为数字
2、if()会将里面的值转为布尔值
3、undefined,null,false,0,NaN,""转为 false `[],{}转为true`

==会做一个隐式类型转换之后再比较，===直接比较

## JavaScript 如何实现继承
1、原型链继承（构造函数）：通过**prpto**继承
`注意：父类构造函数中的引用类型属性会被所有子类实例共享，修改一个实例的引用类型属性会影响其他实例。在创建子类实例时，无法向父类构造函数传递参数`
2、类继承（class 实际上是构造函数的语法糖，仍然基于原型链实现继承）：extends 继承，属性通过 super 继承
3、组合继承
4、原型式继承
5、寄生式继承
6、寄生组合式继承

## JavaScript 中的事件模型的理解？（事件循环、事件代理）
`DOM是一个树形结构，涉及父节点和子节点的事件`
事件流：事件捕获=>事件处理=>事件冒泡,按照这个顺序确定执行顺序（从触发事件的根节点开始）。
事件模型：
1、原始事件模型：直接绑定和 js 获取 dom 元素绑定[只支持冒泡，不支持捕获] [同一个类型的事件只能绑定一次]
2、标准事件模型：事件捕获=>事件处理=>事件冒泡从这个顺序依次检查是否绑定了事件，有则执行 addEventListener,可以绑定多次，false 为冒泡，true 为捕获
3、IE 事件模型：attachEvent(),detachEvent()

事件代理（委托）：就是通过事件冒泡机制将事件绑定在父元素上面(例如绑定在 ul 节点上)
优点：动态绑定，减少重复工作（比如给新增的 li 节点也绑定事件）
`foucs,blur,submit,reset,load,unload,mouseenter,mouseleave不会触发冒泡事件`=>`foucsin,foucsout,mouseover,mouseout代替`
`target:点击到的元素（li），currentTarget:绑定事件的元素（ul），在事件委托里面这两个元素并不相等`

事件循环：同步任务放入执行栈中执行，异步任务交给宿主环境（浏览器、Node），时机一到就将回调函数推送到任务队列中（定时器时间结束，点击事件开始），
执行栈结束了就会去看任务队列是否有任务需要执行，反复去看是否有任务需要执行，因为定时器的时间不同，反复看的过程就被称为事件循环。
宏任务：定时器，新程序执行（整个 script 标签）
微任务：Promise.then(),.catch(),.finally()，Object.observe（已经被 proxy 代替）[先做同步任务，再异步任务（先微任务再宏任务）]
promise 本身是同步的 微任务是由 js 引擎发起的，宏任务是由浏览器发起的，整个 script 代码块属于宏任务。
`async/await:awiat等待的代码可以理解为是同步的 await console.log(123),但是在await后面的代码需要放到微任务队列中。`

`补充：e.stopPropagation()这个可以阻止事件冒泡，e.preventDefault()阻止事件默认行为（比如点击a标签跳转，拖拽到div上报错）`

## ajax 的实现原理，如何实现？（异步编程的实现方式）
`原理：通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用JavaScript来操作DOM而更新页面`
1、const xhr = new XMLHttpRequest();创建对象
`此处可以设置xhr.timeout超时时间， xhr.ontimeout超时回调，xhr.onerror异常处理等`
2、xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');通过open方法定义请求方法，地址，参数等
3、xhr.send(); [对于post请求，可以在这一步之前设置响应头xhr.setRequestHeader]
4、接受响应xhr.onreadystatechange（0、1、2、3、4），状态发生改变时就会触发（触发四次）0 1 2 3 4  未初始化，open send 服务端返回部分结果，全部结果[思考：或许可以不要这一步]  
5、直接进行判断xhr.readyState === 4 也就是结果返回
`根据要求进行xhr.abort()取消请求发送`

`AJAX请求的发送方式有很多种：原生xhr发送，jQuery，axios,fetch`

1、定时器
2、回调函数：回调地狱
3、Promise：.then,.catch,.finally   AJAX是基于promise实现（返回的结果可以实现.then调用）
4、generator：它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。
5、async：async函数是generator和promise实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个promise对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。


## 说说你对正则表达式的理解？应用场景？

const reg = /^ab$/ig; i 表示忽略大小写，g 表示全局匹配

test() exec()都是正则自带的方法，需要 reg 调用。 test()返回值 true 或 false exec()返回值 ['AB', index: 11, input: 'dsjofdsfjiaABkdow', groups: undefined]
replace() match()需要字符串调用。 返回值为替换的字符串。 match()返回值类似 ['AB', index: 11, input: 'dsjofdsfjiaABkdow', groups: undefined]

a\* 表示匹配 0 或者多次，a+一次或多次，a？0 次或一次，
{n} 只能匹配 n 次，{n,}大于或等于 n 次，{n,m}n 到 m 次

let reg = /^(?=._\d._)(?=._[a-z]._)(?=._[A-Z]._)[\da-zA-Z_]{6,12}$/ 
let reg = /^(?=\d+)(?=[a-z]+)(?=[A-Z]+)[a-zA-Z0-9]{6,12}$/ 错误之处，\d+检查开头位置至少要有一个或多个数字、[a-z]+检查开头位置至少要有一个或小写字符数字、

`let num = '18770632553'`
`let reg = /^(\d{3})(\d{4})(\d{4})$/`
`let result = num.replace(reg, '$17065$3')`

`\b表示匹配对象的周围需要是非字符串，逗号，空格都可以`
`\d:0-9  大写取反`
`\w:任意字母数字和字符串`
`\s:任意换行符，空格和制表符   [\t\r\n\v\f]   在中括号中^代表取反，在外面指的是以什么开头。`

`使用场景：表单验证`

## DOM 的常见操作？（BOM 的理解，常见的 BOM 对象）

1、创建节点：document.createElement("div");document.createTextNode("content");
2、选择节点：
querySelector('选择器') querySelectorAll('选择器') 满足条件的第一个元素，和全部元素
这里面等同于样式选择器，需要加.类名，只要是 css 选择器都可以，.class,#id,div,[name="username"]
document.getElementById('id 属性值');返回拥有指定 id 的对象的引用
document.getElementsByClassName('class 属性值');返回拥有指定 class 的对象集合
document.getElementsByTagName('标签名');返回拥有指定标签名的对象集合
document.getElementsByName('name 属性值'); 返回拥有指定名称的对象结合
document/element.querySelector('CSS 选择器'); 仅返回第一个匹配的元素
document/element.querySelectorAll('CSS 选择器'); 返回所有匹配的元素
document.documentElement; 获取页面中的 HTML 标签
document.body; 获取页面中的 BODY 标签
document.all['']; 获取页面中的所有元素节点的对象集合型
特性 innerText textContent innerHTML
返回内容 用户看到的文本内容 元素及其子元素的纯文本内容 元素的 HTML 内容(包含子元素的 html 结构)
包含隐藏元素 不包含 包含 包含
HTML 标签解析 解析 HTML 实体 不解析 HTML 标签 解析 HTML 标签
影响布局 影响，触发回流 不影响 影响，触发重新解析和渲染
性能 较低效，可能触发回流 高效，不触发回流 较低效，触发重新解析和渲染
安全性 较安全，但可能解析 HTML 实体 最安全，不解析 HTML 标签 需要防范 XSS 攻击，注意插入内容的安全性
常见用途 获取或设置用户看到的文本 获取或设置元素的所有文本内容，不论是否隐藏 获取或设置元素的 HTML 内容，允许插入 HTML 片段

el.id='' el.type='' 给标签元素添加属性 不需要创建
在操作 CSS 样式时，el.style.border='1px solid silver' 标准格式

3、添加节点
el.appendChild(txt) 将文本内容插入新建的元素节点中
el.appendChild(el) 将元素节点插入已经存在的节点中,插在节点末尾
A.insertBefore(B,ref) 将元素节点插入已经存在的节点中,插在 ref 节点前面
setAttribute 设置节点属性

4、删除节点
A.removeChild(B) 删除父元素中的子元素，没有就删除整个元素
注意：删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置

obj.cloneNode(bool) obj 被复制的元素，1 或 true 复制父元素及所有子元素，0 或 false 仅复制父元素
A.replace(new,old) A 父元素，
obj.attr 可用于获取属性值或者添加属性值，但不能获取自定义属性值，如给 input 标签添加 data 属性，
因此，可以用 getAttribute('attr')代替 setAttribute('attr',值)设置属性值 removeAttribute('attr')
obj.hasAttribute('attr') 判断元素是否含有某个属性
getComputedStyle(obj).backgroundColor 或者 getComputed(obj['attr'])
在设置 style 样式时采用 background-color:pink 方式，而在 DOM 获取或者设置样式时采用驼峰命名法 backgroundColor
例外，obj.style.cssText='height:100px;background-color:pink;'不采用驼峰命名法
`obj.parentNode 获取父元素` obj.children[i] 父节点下的某个子节点
innerHTML 是获取元素内部所有内容 innerText 是元素内部文本内容

`el.parentNode.removeChild(el)删除自身元素`

dom（文档对象模型）和 bom（浏览器对象模型）
bom 包含 dom（子对象），
1、document(dom)：文档对象，用于操作页面元素
2、location：地址对象，用于操作 URL 地址
3、navigator：浏览器对象，用于获取浏览器版本信息
4、history：历史对象，操作浏览器历史 `forward，back，go 前、后、指定历史记录`
5、frames：
6、screen：屏幕对象，操作宽高

方法：alert(),confirm()判断对话框,open()打开窗口,close(),定时器等

JavaScript 由代码和宿主环境组成
宿主环境：需要提供进行代码的基本实现和环境交互必须的拓展
浏览器：console.log 在后台 node 在终端 (基本实现)
浏览器提供 documnet.get 等等方法，node 提供 fs，http 模块 (环境交互必须的拓展)
dom 和 bom 就是当 JavaScript 运行在浏览器中宿主环境提供的环境交互必须的拓展

## 本地储存的方式？区别和应用场景

cookie:一般由服务器生成，可以设置过期时间，数据储存大小为 4k， cookie 的数据会自动的传递到服务器，服务器端也可以写 cookie 到客户端
localstorage:除非被清理，否则一直存在 5m 仅在本地保存（不支持存储对象，需要转为字符串格式） "JSON.stringify","JSON.parse"
sessionstorage:页面关闭就清理 5m 仅在本地保存
indexDB:除非被清理，否则一直存在 无限大。
`补充：JSON.stringify()一般用于对象，toString()一般用于数字`

使用场景：
1、标记用户与跟踪用户行为的情况，推荐使用 cookie
2、适合长期保存在本地的数据（令牌），推荐使用 localStorage
3、敏感账号一次性登录，推荐使用 sessionStorage
4、存储大量数据的情况、在线文档（富文本编辑器）保存编辑历史的情况，推荐使用 indexedDB

## 函数式编程的优缺点
命令式编程，声明式编程和函数式编程
命令式编程
函数式方式：就是要把过程逻辑写成函数，定义好输入参数，只关心它的输出结果

核心概念
1、函数是一等公民：
函数可以像普通变量一样被传递、赋值给其他变量，作为参数传入其他函数，也可以作为函数的返回值。
2、纯函数：
纯函数指的是函数的返回结果只依赖于其参数，并且在执行过程中没有副作用（不会影响外部状态）。相同的输入始终会得到相同的输出，不会修改全局变量或者传入的参数。
3、不可变性：
数据一旦创建，就不能被修改或者改变，任何修改操作都会返回一个新的数据副本，而不是在原有数据上进行修改。
4、高阶函数：
高阶函数是指接受一个或多个函数作为参数，或者返回一个新函数的函数。它们可以组合现有函数来创建新的函数，从而提高代码的复用性和灵活性。

## 如何实现函数缓存，应用场景？

## JavaScript 中数字精度丢失问题？如何解决？
javascript 中采用 IEEE754（64 双精度）记录数字，本身是以二进制存储，符号位一位 0（正数）和 1（负数），指数位 11 位，符号位 52 位，
由于有些数字（比如 0.1 不可以，0.125 可以）等就不能转为二进制，因此有效位就存储一个接近该数字的有效位。
`通俗理解：三分之一加三分之二等于1，但计算机不能识别三分之一，需要将三分之一转为0.3333，因此最后结果出现偏差。`
`解决方法： console.log(Math.round(0.999) === 1) `

Math.PI: 圆周率，约等于 3.14159。
Math.E: 自然对数的底，约等于 2.718。
绝对值: Math.abs(x) 返回 x 的绝对值。
向上取整: Math.ceil(x) 返回大于或等于 x 的最小整数。
console.log(Math.ceil(6.4)) //7
console.log(Math.floor(6.4)) //6
console.log(Math.round(6.4)) //6
console.log(Math.round(6.6)) //7
向下取整: Math.floor(x) 返回小于或等于 x 的最大整数。 类似于 parseInt
四舍五入: Math.round(x) 返回 x 的四舍五入整数。
幂运算: Math.pow(x, y) 返回 x 的 y 次幂。
console.log(Math.pow(10, 2)) //100
平方根: Math.sqrt(x) 返回 x 的平方根。
随机数: Math.random() 返回一个介于 0（包括）和 1（不包括）之间的随机数
console.log(Math.random())

## 大文件如何做到断点上传

## 如何实现上拉加载，下拉刷新？
上拉加载：`iscroll、better-scroll、pulltorefresh.js=>用于下拉刷新`
let clientHeight  = document.documentElement.clientHeight; 浏览器的高度
let scrollHeight = document.body.scrollHeight;             整体滚动的长度，值肯定比浏览器高度大
let scrollTop = document.documentElement.scrollTop;        整体最上方的位置距离浏览器上方的距离

`clientHeight+scrollTop=scrollHeight表示正好接触到底部`
 
let distance = 50;  //距离视窗还用50的时候，开始触发；

if ((scrollTop + clientHeight) >= (scrollHeight - distance)) {
    console.log("开始加载数据");
}
小程序比较多：
onReachBottom  "onReachBottomDistance": 50  接触底面的生命周期函数和当距离底面多少距离触发钩子函数
onPullDownRefresh  下拉刷新


## 什么是单点登录如何实现？

## web 常见的攻击方式有哪些？如何防御？
1、XSS跨站脚本攻击：
2、CSRF跨站请求伪造：
3、SQL注入攻击：

## ES6 模块(浏览器)和 CommonJS（nodejs）模块有什么异同？
1、导入导出语法:
`CommonJS 使用 module.exports 和 require。ES6使用export和import。`
2、加载方式:
`CommonJS 是同步加载，适用于服务器端。ES6模块是异步加载，适用于浏览器端。`
3、模块的解析:
CommonJS 模块在运行时解析，导入的模块在代码执行时被加载。ES6 模块在编译时解析，可以进行静态分析。
4、顶层作用域:
CommonJS 模块的顶层this指向module.exports。ES6 模块的顶层this是undefined。
5、导入的值是否是实时绑定:
`CommonJS 导入的是模块的拷贝，导入后不会再跟随模块内部变化。ES6 模块导入的是绑定（binding），模块内的变量变化会反映在导入处。`

Node.js: 原生支持 CommonJS 模块，ES6 模块需要在 .mjs 文件中或者在 package.json 中设置 "type": "module"。
浏览器: 原生支持 ES6 模块，但需要在 <script> 标签中设置 type="module"。
工具和打包器: 如 Webpack、Babel 等工具可以同时处理 CommonJS 和 ES6 模块，提供向后兼容性。

## ES6 拓展
1、新增块级作用域
2、新增定义类的语法糖（class）
`采用extends和super继承，采用static定义静态属性和方法，该属性和方法只能用类来访问，采用#定义静态属性，该属性只能在类的内部访问(类的私有字段)`
`使用 get 和 set 关键字定义访问器属性，用于控制属性的访问和赋值。`
3、新增了一种基本数据类型（Symbol）
4、给数组新增了 API(includes，flat,find,fill,entries()，keys()，values())
`Array.from():类数组对象（具备length属性和索引元素的对象，比如arguments对象），可遍历的对象（用于字符串和split效果一样），set，map，可迭代对象（如生成器）`
`Array.of():将一组值转为数组，Array() // []    Array(3) // [, , ,]   Array(3, 11, 8) // [3, 11, 8]`
ES6 则是明确将空位转为undefined

5、对象新增属性
1、键名与对应值名相等的时候，可以进行简写
2、Object.keys()，Object.values()，Object.entries()

5、新增了 set 和 map 数据结构
6、Object.assign,Object.keys,Object.values,Object.entires，getOwnProperty（用于深拷贝）

let,const,for of,箭头函数，模板字符串`${}`，解构赋值，默认参数[函数的length为形参的个数，...rest和默认参数后面的参数不算]，展开运算符，模块化（import，export），promise，async/await，Generators

## 实现 promise.all
// 1、promise.all 返回的是一个 promise  
// 2、all 里面传递的参数是一个可迭代的对象，可能是数组或 set 等结构
// 3、当里面传递的是一个空对象时，返回的对象也是空对象
// 4、当有一个存在拒绝时，返回拒绝的结果
// 5、返回结果的顺序和传递的参数顺序是一致的
Promise.myAll = function (proms) {
    return new Promise((resolve, reject) => {
        const result = [];
        let fulfilledCount = 0;
        const count = proms.length;
        if (count === 0) {
            return resolve(result); // 如果传递的数组为空，则直接resolve一个空数组
        }
        proms.forEach((prom, index) => {
            Promise.resolve(prom).then((data) => {
                result[index] = data; // 将获取的数据放入对应的索引
                fulfilledCount++;
                if (fulfilledCount === count) {
                    resolve(result); // 当所有的 Promise 都成功时，resolve 最终结果数组
                }
            }).catch(reject); // 如果任意一个 Promise 失败，立即 reject
        });
    });

};

## 实现 promise.race(超时处理，定义一个三秒取消操作的 promise)
Promise.race:只要实例中有一个先改变状态，就把这个实例的参数返回值传出去。使用场景：请求超时提示。
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(resolve).catch(reject)
        }
    })
}
//Promise.resolve(promises[i]).then((data)=>resolve(data)).catch(reject)

const promise1 = new Promise(resolve => setTimeout(() => resolve('foo'), 3000));
const promise2 = new Promise(resolve => setTimeout(() => resolve('bar'), 2000));
const promise3 = new Promise((resolve, reject) => setTimeout(() => reject('baz'), 1000));

Promise.race([promise1, promise2, promise3])
.then(result => console.log(result)) // 输出 "baz"
.catch(error => console.error(error)); // 输出 "baz"

## js 的设计模式有哪些？

## 工程化
前端工程化是一种开发方法论和实践，通过将前端开发流程中的各个环节进行规范化、自动化和模块化，以提升开发效率、代码质量和项目可维护性。

核心原则：
1、组件化开发：vue 中不同界面不同的组件
2、模块化开发：不同的功能实现，比如 api 的请求
3、自动化构建工具：帮助我们自动处理和优化前端项目的构建过程，包括编译、压缩、合并文件等。
4、规范的代码风格可以提高代码的可读性和可维护性。通过使用代码风格检查工具（如 ESLint）和代码格式化工具（如 Prettier）
5、团队协作与版本控制：git
6、依赖管理：npm,yarn,pnpm

## 什么是面向对象编程思想？
面向对象：是一种编程范式，它将程序设计任务组织为对象的集合。每个对象都是类的实例，通过封装数据（属性）和行为（方法）来实现特定的功能。
基本概念：类，对象，继承，封装（数据和操作数据的方法结合在一起，限制对数据的直接访问），多态（态允许不同类的对象通过相同的接口调用不同的实现方法）
1、提高代码重用性：通过继承和组合，可以重用已有的类和模块，减少代码重复。
2、提高代码可维护性：通过封装和模块化设计，使代码更易于维护和修改。
3、提高代码可扩展性：通过多态和接口设计，使代码更易于扩展和实现新的功能。
4、提高代码可读性：面向对象的代码通常更符合现实世界的思维方式，使代码更易于理解。


## 如何实现两栏布局，右侧自适应？三栏布局中间自适应呢？
1、采用flex布局：大盒子采用 display: flex;左边固定宽高，右边设置flex-grow: 1; 三栏布局的原理一样
`flex-grow:（将剩余空间）按照比例拓展。区别于flex：1.将全部空间按比例分。一般这两个属性都有其它值。例如flex-grow:1，flex-grow:2即第一份占比三分之一 `
flex-direction：主轴方向
flex-wrap：是否换行
flex-flow：（将剩余空间）按照比例拓展
justify-content：主轴上的对齐方式
align-items：交叉轴的对齐方式
align-content：定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
`item属性（子元素）：order，定义了item的排列顺序，数字越小，排列越靠前`
使用场景：方便实现元素水平垂直居中，方便自适应布局，目前移动端、小程序开发基本都建议Flex布局

2、grid布局：.container { display: grid;grid-template-columns: 200px 1fr 200px; /* 左右固定200px，中间自适应 */}  fr表示自适应布局
`当表格内部为行内元素时：display：inline-grid `
grid-template-columns：定义每一列的列宽
grid-template-rows：定义每一行的行高
grid-template-areas：用于定义区域
`简写：grid-template`
repeat(a,b)重复的次数和重复的值

`justify-items: center; align-items: center; 居中处理`
Grid布局：是一种二维布局系统，用于创建复杂的网页布局。它通过行和列将页面分成网格，从而可以轻松地将内容放置在网格中的任意位置。[把flex布局看成一维布局]

3、定位：用100vw减去两边的宽度

`auto属性：弹性设置，也就是根据其它内容的大小综合设置。在grid布局中类似fr`
width,height属性设置auto，意味默认宽高，块级元素自动填满父级元素，行内元素根据内容大小填。
margin:水平居中

## 如何实现单行／多行文本溢出的省略样式
单行文本溢出：
text-overflow：规定当文本溢出时，显示省略符号来代表被修剪的文本
white-space：设置文字在一行显示，不能换行
overflow：文字长度超出限定宽度，则隐藏超出的内容

多行文本溢出省略：
1、伪元素  ::after 设置里面的内容content：...,设置父元素的高度，超过部分隐藏overflow: hidden;，再加上定位（基于高度截断）
2、-webkit-line-clamp: 2 （基于行数截断）

## 





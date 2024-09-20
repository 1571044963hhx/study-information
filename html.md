## html基本结构和元素介绍
<!DOCTYPE html>：告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型定义来解析文档，不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。它必须声明在HTML⽂档的第⼀⾏。
` 就是让浏览器进入标准模式(严格模式)，使用最新的 HTML5 标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，我们需要避免此类情况发生。`

浏览器的渲染模式：document.compatMode
CSS1Compact:标准模式，默认模式，浏览器使用W3C的标准解析渲染页面。BackCompat：怪异模式
<html lang="en">：定义HTML文档的根元素，lang="en" 属性指定文档的语言为英语。
<head>:标签用于定义文档的头部，它是所有头部元素的容器。 head中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等。包含文档的元数据（meta-data）、样式表、脚本等。

`元数据在浏览器加载页面之前进行解析，用于设置文档的字符集、描述、关键词、作者、视口设置等，影响页面的展示和行为。`

<meta>:由name和content属性定义，用来描述网页文档的属性，比如网页的作者，网页描述，关键词等，除了HTTP标准固定了一些name作为大家使用的共识，开发者还可以自定义name。

<meta name="author" content="Your Name">
<meta name="keywords" content="关键词" />
<meta name="description" content="页面描述内容" />好的关键字和描述有利于搜索
<meta name="copyright" content="Your Company Name">
<meta name="date" content="2024-07-13" scheme="YYYY-MM-DD">


<meta charset="UTF-8">:指定文档的字符编码为UTF-8。
原因：UTF-8是一种通用的字符编码，能够表示几乎所有语言的字符，确保文档内容在不同语言环境下都能正确显示。
<meta name="viewport" content="width=device-width, initial-scale=1.0">:控制视口的尺寸和缩放,width=device-width 将视口的宽度设置为设备的宽度，initial-scale=1.0 设置初始缩放比例为1。
这些设置确保页面在不同设备上都有良好的显示效果，尤其是在 [移动设备] 上。

<title>Document</title>:设置文档的标题。

<body>：包含文档的主体内容，是用户可以看到和交互的部分。
原因：<body> 标签包裹了所有呈现在页面上的内容，包括文本、图像、表格、链接等。所有实际的页面内容都应该放在这里。

## 说说你对 WEB 标准以及 W3C 的理解与认识
web 标准简单来说可以分为结构、表现和行为。其中结构主要是有 HTML 标签组成。或许通俗点说，在页面 body 里面我们写入的标签都是为了页面的结构。表现即指 css 样式表，通过 css 可以是页面的结构标签更具美感。
行为是指页面和用户具有一定的交互，同时页面结构或者表现发生变化，主要是由 js 组成。
web 标准一般是将该三部分独立分开，使其更具有模块化。但一般产生行为时，就会有结构或者表现的变化，也使这三者的界限并不那么清晰。
W3C 对 web 标准提出了规范化的要求，也就是在实际编程中的一些代码规范：包含如下几点

对于结构要求：（标签规范可以提高搜索引擎对页面的抓取效率，对 SEO 很有帮助）
1）标签字母要小写
2）标签要闭合
3）标签不允许随意嵌套

对于 css 和 js 来说
1）尽量使用外链 css 样式表和 js 脚本。是结构、表现和行为分为三块，符合规范。同时提高页面渲染速度，提高用户的体验。
2）样式尽量少用行间样式表，使结构与表现分离，标签的 id 和 class 等属性命名要做到见文知义，标签越少，加载越快，用户体验提高，代码维护简单，便于改版
3）不需要变动页面内容，便可提供打印版本而不需要复制内容，提高网站易用性。


## 行内元素和块级元素有哪些？
行内元素：span,button,input,a,strong,em,label,
`注意：行内元素不能设置和高度有关的属性`
块级元素：div,img,h1-h6,p,ul,ol,li,table,from,header

## 说一下 web worker
在 HTML 页面中，如果在执行脚本时，页面的状态是不可响应的，直到脚本执行完成后，页面才变成可响应。web worker 是运行在后台的 js，独立于其他脚本，不会影响页面的性能。 并且`通过 postMessage 将结果回传到主线程`。这样在进行复杂操作的时候，就不会阻塞主线程了。
如何创建 web worker：
1、主线程创立
const worker = new Worker('worker.js');`里面放入的是计算脚本的链接`
2、worker.postMessage({ key: 'value' });向分线程发送信息
3、self.addEventListener('message', (e) => {
    console.log('Message received from main thread:', e.data);
});
self.close(): 关闭 Web Worker 线程，Web Worker 执行完任务后通常会调用这个方法。
self.addEventListener('error', (e) => {
    console.error('Error in worker:', e.message);
});
4、Web Worker 的限制
无法访问 DOM: Web Worker 运行在独立线程中，无法直接操作 DOM 元素。
不能使用 window 和 document 对象: Web Worker 不具有 window 或 document 对象。
只能使用有限的全局对象: Web Worker 中可用的全局对象包括 self, importScripts, postMessage, close 和 ErrorEvent.
无法直接使用 localStorage: Web Worker 不支持直接使用 localStorage，可以通过 postMessage 与主线程沟通来实现类似功能。

## 说一下FileReader
FileReader 是 JavaScript 中的一个 Web API，它`允许 web 应用程序异步读取用户计算机上的文件（或原始数据缓冲区）的内容，例如读取文件以获取其内容`，
并在不将文件发送到服务器的情况下在客户端使用它。这对于处理图片、文本文件等非常有用，尤其是当你想要在用户界面中即时显示文件内容或进行文件预览时。

readAsArrayBuffer(file): 异步读取文件内容，并将结果作为一个 ArrayBuffer 对象返回。
readAsDataURL(file): 异步读取文件内容，并将结果作为一个表示文件内容的 DataURL 返回。`这特别适用于图片文件，因为它可以直接被 <img> 标签的 src 属性使用`。
readAsText(file, [encoding]): 异步读取文件内容，并将结果作为文本字符串返回。你可以指定一个编码（默认为 ‘UTF-8’）

onload: 当读取操作成功完成时触发。
onerror: 当读取操作发生错误时触发。
onabort: 当读取操作被中止时触发（可以通过调用 abort() 方法来中止）。
onprogress: 在读取过程中周期性触发，可以用来显示读取进度
onloadstart, onprogress, onloadend: 这些事件提供了读取操作的更多控制点，比如开始、进度和结束。

## 拖拽API
dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。
darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。
dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。

## 什么是盒子模型
1、内容 content
2、padding 内边距
3、边框 border
4、外边距 margin
标准盒模型：height+padding+border+margin = content+padding+border+margin
IE 盒模型:height+margin = content+padding+border+margin
box-sizing: content-box|border-box|inherit:

content-box 默认值，元素的 width/height 不包含 padding，border，与标准盒子模型表现一致
border-box 元素的 width/height 包含 padding，border，与怪异盒子模型表现一致
inherit 指定 box-sizing 属性的值，应该从父元素继承

## css 有哪些选择器？优先级？那些属性可以继承？
1、id选择器   100
2、类，伪类，属性选择器。例如 .classname、[type="text"]、:hover。
3、元素选择器
4、后代，子代相邻同胞选择器  #ab div该id选择器下面的所有div元素

！important >内联 > ID选择器 > 类选择器 > 标签选择器

可继承：
1、与文字有关的样式：
2、与文本有关的属性：line-height,text-indent,text-aligin  行高，缩进，对齐方式等
3、元素可见性：visibility
4、列表属性：list-style-type：文字前面的小点点样式
5、表格布局属性：border-collapse：合并表格边框，border-spacing：设置相邻单元格的边框间的距离
6、光标：cursor
`注意：a 标签的字体颜色不能被继承,h1-h6标签字体的大下也是不能被继承的`

## 说说 em、px、rem、vh、vw 、vmin、vmax的区别
em：相对父元素的字体大小
px:像素
rem：相对根元素字体大小，适用于全局一致的尺寸设定。
vh:相对浏览器窗口高度的大小
vw:相对浏览器窗口宽度的大小
vmin:当前视口宽度和高度的最小值
vmax:当前视口宽度和高度的最大值
`任意浏览器的默认字体高都是 16px`

## 说说设备像素、css像素、设备独立像素dip、dpr、ppi 之间的区别？
css像素：在没有缩放的情况下，1css像素等于1个设备独立像素
在同一个设备上，每1个 CSS 像素所代表的设备像素是可以变化的（比如调整屏幕的分辨率）
在不同的设备之间，每1个 CSS 像素所代表的设备像素是可以变化的（比如两个不同型号的手机）
`可以把css单位认为是一个虚拟相对的单位，不同的显示器css表示的设备像素是不一定的。`

设备像素：指设备能控制显示的最小物理单位。屏幕生产之后设备像素就是一个固定值，单位`pt`。和分辨率挂钩
`一个1080p的显示器分辨率是1920x1080，意味着它有1920个水平设备像素和1080个垂直设备像素。当我们调整分辨率时，屏幕显示的宽度和高度会变化，而不是清晰度。`

`DIP(设备独立像素)`：与设备无关的逻辑像素，代表可以通过程序控制使用的`虚拟像素`，是一个总体概念，包括了CSS像素`（分辨率）`:设备独立像素包括了css像素

`DPR(设备像素比)`:设备像素和CSS像素之间的比例关系，`表示一个CSS像素包含多少个设备像素`.
DPR=设备像素/css像素   `对于一个DPR为2的设备来说，一个CSS像素对应2x2的设备像素矩阵，也就是4个设备像素。`
1080 1920分辨率对应的css像素为540px和960px

PPI:每英寸像素，表示每英寸包含的像素点的数目，可以理解为像素密度，数值越高，说明屏幕显示的图像越清晰。
屏幕分辨率：X  Y
PPI = 根号（X的平方+Y的平方）除以屏幕尺寸
`屏幕的缩放会改变dpr的值。`
1、无缩放情况下，1个CSS像素等于1个设备独立像素
2、设备像素由屏幕生产之后就不发生改变，而设备独立像素是一个虚拟单位会发生改变
3、PC端中，1个设备独立像素 = 1个设备像素 （在100%，未缩放的情况下）
4、在移动端中，标准屏幕（160ppi）下 1个设备独立像素 = 1个设备像素
5、设备像素比（dpr） = 设备像素 / 设备独立像素
6、每英寸像素（ppi），值越大，图像越清晰

`补充：由于pc端的宽高不一致，设置px会出现适配问题`
`响应式设计:是一种网络页面设计布局，页面的设计与开发应当根据`用户行为以及设备环境`(系统平台、屏幕尺寸、屏幕定向等)``进行相应的响应和调整`
响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理，为了处理移动端，页面头部必须有meta声明viewport
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>

属性：
width=device-width: 是自适应手机屏幕的尺寸宽度
maximum-scale:是缩放比例的最大值
inital-scale:是缩放的初始化
user-scalable:是用户的可以缩放的操作

1、使用媒体查询
@media screen (min-width: 1200px) {
  .container {
    max-width: 1140px;
    margin: 0 auto;
  }
}

/* 适用于中等屏幕 */
@media screen (min-width: 992px) and (max-width: 1199px) {
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}

/* 适用于小屏幕 */
@media screen (max-width: 991px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}
2、使用（flex，grid）布局，比如直接设置比例 flex：1
3、百分比的设置  width：80%
4、使用视口单位 vw,vh
5、使用JavaScript动态调整
6、使用em和rem单位
7、CSS框架（如Tailwind CSS、Bulma）提供了丰富的工具类，帮助快速实现响应式设计

## 谈谈你对BFC的理解？(主要用来解决margin坍塌，float元素覆盖后面的元素的问题)
BFC:块级格式化上下文，它是页面中的一块渲染区域，并且有一套自己的渲染规则
触发条件：
1、根元素，即HTML元素
2、浮动元素：float值为left、right  `父元素设置float属性`
3、overflow值不为 visible，为 auto、scroll、hidden  `除了visable其它都可`
4、display的值为`inline-block`、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
5、position的值为absolute或fixed
6、设置display：flow-root

`理解：按照正常块级排列的方式来说，有很多缺陷，因此给块级元素内部开启BFC以解决这些排放的缺陷。即给块级元素设置一个独立的排列规则`

常规块级元素排列有以下缺陷：
1、水平方向上，撑满整个包含块宽度，垂直方向上，依次摆放
2、垂直方向上相邻的元素，margin会合并   `比如第一个div设置margin10px，第二个div设置margin20px，会合并小的margin，因此两者的间距为20px` [ok]
3、父子关系情况下可能会产生margin塌陷   `margin塌陷：在垂直方向上，子元素和父元素的margin不存在（当设置了margin的情况下）` ：此处也可以给父盒子设置padding或者border属性也可以解决 [ok]
4、父子关系情况下，父元素无视浮动元素会产生高度坍塌
`父元素没有设置高度的情况下，其高度是由子元素撑开的，但当子元素都设置了浮动元素之外，父元素无法获取子元素的高度，也就是父元素高度为0，看不到了`
5、兄弟关系下，正常元素可能会被浮动元素覆盖（正常元素在浮动元素之后）        =>可以理解为开启BFC后，不同的BFC区域渲染时不会相打扰
`浮动元素相比较正常元素层级更高，但不占有空间，当设置浮动元素后，后面的元素会被浮动元素覆盖`注意：开启display:absolute这个层级比float属性更高，因此后面的元素覆盖浮动元素

开启BFC
1、其子元素不再产生margin塌陷的问题
2、就算子元素浮动，自身高度也不会坍塌（高度计算不在无视浮动元素）
3、自身不会被其它元素覆盖
`注意：BFC不能解决margin合并的问题，直接多设置了margin宽度即可`

## 清除浮动
1、当一个父容器内的所有子元素都被浮动时，父容器的高度会塌陷为 0，因为浮动元素不占据父容器的高度。
2、如果浮动元素后面有兄弟元素，这些兄弟元素会被浮动元素挤到一旁，导致布局错乱

1、在父容器上使用伪元素 ::after 并设置content:'',display:block, clear: both
2、给父容器添加 overflow: hidden、overflow: auto 或 overflow: scroll。
3、在浮动元素之后添加一个空的 div 元素，并设置 clear: both
4、创建一个通用的 clearfix 类，通过 ::after 伪元素来清除浮动。
`12解决父容器高度坍塌，34解决兄弟元素排列问题`

## 元素垂直居中的方法？如果元素不定宽高？
1、flex布局：justify-content: center; align-items: center;
2、grid布局：display: grid; place-items: center; 
3、table布局：display: table;  子元素设置：display: table-cell;vertical-align: middle; /* 垂直居中 */text-align: center;/* 水平居中 */
4、使用定位和transform：父元素reactive定位，子元素absolute定位，且top:50%,left:50%=>子元素的左上角位于父元素的中间
transform:translate(-50%, -50%),移动自身宽高的50% [或者使用margin：-50%]
5、margin:auto,父元素display:flex,子元素margin:auto

`水平居中：text-align:center,垂直居中：line-height = height`

## 如何实现两栏布局，右侧自适应？三栏布局中间自适应呢？（如何居中处理）
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

1、`justify-items: center; align-items: center; 居中处理`  flex布局和grid布局都是这么处理的
2、通过定位和transform：先定位50%，50%。在移动translate（-50%，-50%）
3、定位和margin：和上面的原理一样，设置margin-left和margin-top都为负值，缺点需要计算具体的px值。
4、table:设置父元素为display:table-cell，子元素设置 display: inline-block。利用vertical:middle和text-align:center可以让所有的行内块级元素水平垂直居中

Grid布局：是一种二维布局系统，用于创建复杂的网页布局。它通过行和列将页面分成网格，从而可以轻松地将内容放置在网格中的任意位置。[把flex布局看成一维布局]

3、定位：用100vw减去两边的宽度

`auto属性：弹性设置，也就是根据其它内容的大小综合设置。在grid布局中类似fr`
width,height属性设置auto，意味默认宽高，块级元素自动填满父级元素，行内元素根据内容大小填。
margin:水平居中

## 元素定位
在网页设计和开发中，文档流（NormalFlow）是指网页中元素的默认排列顺序，这种排列方式由浏览器的渲染引擎自动处理。
在未应用任何CSS布局技术（如浮动、定位等）时，元素遵循文档流的自然规则来显示。 -->
块级元素：在文档流中自动填满其父元素的宽度，并在其前后形成换行。常见的块级元素包括 
<div>, <p>, <h1>-<h6>, <section>, <article> 等。它们默认从上到下堆叠。
内联元素：不会独占一行，只占据它所需的空间。常见的内联元素有 <span>, <a>, <strong>, <em> 等。
这些元素通常出现在块级元素内部，它们沿着文本方向排列。
元素尺寸：在文档流中，块级元素可以设置宽度和高度，内联元素虽然可以设置高度和宽度，但可能不会影响文档流中的布局（比如，不会推开其他文本或元素）。 

`理解：有关高度的设置是无效的，例如上间距和下间距，[左右之间的间距设置是有效的]`

描述：
static:静态定位，按照文档流的排列方式布局
fixed：元素的位置相对于浏览器窗口固定，即使窗口被滚动，元素也会停留在指定位置。
使用场景：适用于需要固定在视口特定位置的元素，如固定头部或底部栏。
Absolute 定位：元素的位置相对于`最近的非 static [因此采用relative定位]定位的祖先元素`进行定位。
如果没有这样的祖先元素，则相对于初始包含块（通常是视口）。
Relative 定位：描述：元素的位置相对于其在文档流中的原始位置进行调整。设置为 relative 的元素仍保留在文档流中，即使其位置被调整。
`不会破坏文档流` relative 元素以它原来的位置为基准偏移，在其移动后，原来的位置依旧占据空间。
粘性定位：结合相对和固定定位的特性，在指定阈值范围内表现为相对定位，超出阈值后表现为固定定位。 


## CSS3新增了哪些新特性？（transform,animation,transition）
1、选择器：主要增加了属性选择器和伪类选择器（:nth-child(2),:last:child）
2、新样式：border-radius：创建圆角边框，box-shadow：为元素添加阴影，border-image：使用图片来绘制边框
3、媒体查询：@media
4、flex和grid布局
5、文字：word-wrap 是否换行，text-overflow文本溢出 clip,ellopsis裁剪或者省略号代替，text-shadow 文本阴影
6、颜色：rgba(),rgb+a透明度
7、增加了一些动画的效果：transition，transform，animation，linear-gradient：线性渐变，radial-gradient：径向渐变

`transform:适用与2d和3d转换`  `注意：只会触发重绘，不会触发重排`
语法：transform：变换函数（tanslate,scale,rotate.skew）
tanslate:tanslateX(length),tanslateY,tanslateZ,tanslate(a,y),tanslate3d(x,y,z)
scale:scale(number),scaleX,scaleY,scaleZ,scale(x,y),scale3d(x,y,z)缩放比例
rotate:rotate(45deg)....
skew:skew(45deg)，只能用于2D  倾斜
matrix:matrix(a,b,c,d,e,f)
X 轴的缩放因子、Y 轴的倾斜因子、X 轴的倾斜因子、Y 轴的缩放因子、X 轴的平移量、Y 轴的平移量。

transition: property duration timing-function delay;
`属性用于在【两个状态】之间平滑过渡。常用于元素的样式变化，如颜色、尺寸、位置等`需要事件触发，比如hover
property：要应用过渡效果的 CSS 属性（例如 width、height、background-color 等）。
duration：过渡效果的持续时间（例如 2s、500ms）。
timing-function：过渡的速度曲线（例如 linear、ease、ease-in、ease-out、ease-in-out、cubic-bezier(n,n,n,n)）。
delay：过渡效果的延迟时间（例如 0s、1s）。 举例定义两个类 .box{}  .box:hover{}  这两个状态的变化
transition: width 2s ease 1s, height 2s ease 1s, background-color 2s ease 1s;

`animation 属性用于定义关键帧动画，允许元素在【多个状态】之间进行复杂的动画。`不需要事件触发，其实就是复杂动画
name：定义动画的名称，对应于 @keyframes 规则的名称。
duration：动画的持续时间（例如 2s、500ms）。
timing-function：动画的速度曲线（例如 linear、ease、ease-in、ease-out、ease-in-out、cubic-bezier）。
delay：动画的延迟时间（例如 0s、1s）。
iteration-count：动画播放的次数（例如 infinite、1、2）。
direction：动画的方向（例如 normal、reverse、alternate、alternate-reverse）。
fill-mode：动画结束时元素的状态（例如 none、forwards、backwards、both）


选择器，边框，背景，文字，颜色，transition，transform，animation，渐变



## 怎么理解回流和重绘？什么场景下会触发?(有哪些方法可以隐藏元素，有什么区别？)
opacity:设置元素的不透明度，会影响所有子元素的透明度，仍然参与布局和响应鼠标事件，只是不可见。
rgba:其中a表示alpha通道，取值从0到1。只影响背景色，边框色或文字，不影响子元素的透明度
visibility：visible，hidden。不影响子元素的可见性，元素仍然占据布局，但不会响应鼠标事件。
display:none,把该元素直接移除了
`此处可以补充v-if和v-show的区别`

回流：当页面布局和几何属性（大小，位置）发生变化时，浏览器重新`计算元素的位置和大小的过程`，回流会影响整个页面或者说页面的一部分。
触发条件：添加删除DOM节点，元素的尺寸，边框（宽度发生变化），边距，填充，浏览器窗口的大小，元素内容的变化等等。
offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、
scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight
`这些属性有一个共性，就是需要通过即时计算得到。因此浏览器为了获取这些值，也会进行回流`

重绘：重绘是指当元素的外观（颜色，背景色，边框样式）发生变化时，但没有影响布局，浏览器会重新绘制元素。


## 如何实现单行／多行文本溢出的省略样式
单行文本溢出：
text-overflow：规定当文本溢出时，显示省略符号来代表被修剪的文本
white-space：设置文字在一行显示，不能换行
overflow：文字长度超出限定宽度，则隐藏超出的内容

多行文本溢出省略：
1、伪元素  ::after 设置里面的内容content：...,设置父元素的高度，超过部分隐藏overflow: hidden;，再加上定位（基于高度截断）
2、-webkit-line-clamp: 2 （基于行数截断）

## 如何使用 css 完成视差滚动效果

## css如何画一个三角形，原理是什么？
`主要还是利用border属性，当div不具有宽度和高度时，四个边框都是三角形，隐藏其它三个三角形即可（border-color：transparent），注意需要显示边框border-style：solid`
`当只存在相邻两个边框时，且div的宽高为0，矩形是由两个三角形组成的，隐藏其中一个即可`
.border {
    width: 0;
    height: 0;
    border-style:solid;
    border-width: 0 50px 50px;
    border-color: transparent transparent #d9534f;
}
.box {
    /* 内部大小 */
    width: 0px;
    height: 0px;
    /* 边框大小 只设置两条边*/
    border-top: #4285f4 solid;
    border-right: transparent solid;
    border-width: 85px; 
    /* 其他设置 */
    margin: 50px;
}


## 让Chrome支持小于12px 的文字方式有哪些？区别？
客户端：用户可以直接在客户端chrome://settings/languages里面修改
服务端：
一、zoom：将字体大小缩放为0.8倍，这需要考虑兼容性
.span1{
    font-size: 12px;
    display: inline-block;
    zoom: 0.8;
}
二、-webkit-transform:scale() 针对chrome浏览器,加webkit前缀，用transform:scale()这个属性进行放缩
注意的是，使用scale属性只对可以定义宽高的元素生效，所以，下面代码中将span元素转为行内块元素
.span1{
    font-size: 12px;
    display: inline-block;
    -webkit-transform:scale(0.8);
}

## 说说你对 css 预编译语言的理解？有哪些区别？

变量：
作用域：
代码混合：
嵌套：
代码模块化：

`基本使用：`
less和scss
.box{
  display:block
}
sass stylus
.box
  display:block
`嵌套：`
三者的嵌套语法都是一致的，甚至连引用父级选择器的标记 & 也相同，`区别只是Sass和Stylus可以用没有大括号的方式书写`
.a {
  &.b {
    color: red;
  }
}
`变量:`变量无疑为 Css 增加了一种有效的复用方式，减少了原来在 Css 中无法避免的重复「硬编码」  `目前的css也存在变量`
将变量放入：root中以便全局使用，变量命名之前采用--前缀，采用var函数使用。
<style>
    :root {
        --primary-color: #3498db;
        --secondary-color: #2ecc71;
        --font-size: 16px;
    }
    body {
        color: var(--primary-color);
        font-size: var(--font-size);
    }
    h1 {
        color: var(--secondary-color);
    }
    .custom {
        --primary-color: #e74c3c; /* Override variable locally */
        color: var(--primary-color);
    }
</style>

less声明的变量必须以`@`开头，后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号:分隔开
@red: #c00;
strong {
  color: @red;
}
sass声明的变量跟less十分的相似，只是变量名前面使用`$`开头
$red: #c00;
strong {
  color: $red;
}
stylus声明的变量没有任何的限定，可以使用$开头，结尾的分号;可有可无，但变量与变量值之间需要使用=
在stylus中我们不建议使用@符号开头声明变量
red = #c00
strong
  color: red

`作用域：`
Css 预编译器把变量赋予作用域，也就是存在生命周期。就像 js 一样，它会先从局部作用域查找变量，依次向上级作用域查找。
`Sass变量作用域分为局部和全局。默认情况下，变量在定义它的作用域内有效。`
$global-color: #3498db;
.component {
  $local-color: #e74c3c;
  color: $local-color;
}
`混合`
sass使用 `@mixin 和 @include`定义和调用混合。
@mixin mixin-example {
  color: #3498db;
  font-size: 16px;
}
.component {
  @include mixin-example;
}

less使用`.`定义混合，直接调用`函数定义和使用,可以传递参数`
.mixin-example(@color: red) {
  color: #3498db;
  font-size: 16px;
  color:@color
}
.component {
  .mixin-example();
}

Stylus使用函数定义和调用混合。
mixin-example()
  color #3498db
  font-size 16px
.component
  mixin-example()

`嵌套：`
CSS本身不支持嵌套，但可以通过后代选择器实现有限的嵌套效果。
.parent .child {
  color: #3498db;
}
sass，less和`stylus（不需要括号和分号）`都支持嵌套
.parent {
  .child {
    color: #3498db;
  }
}
`代码模块化：`
css:使用 @import 导入多个CSS文件，但在性能上不如预处理器的导入机制。@import url('styles.css');


`总结：`
CSS: 原生支持变量、自定义属性、和部分的模块化功能。嵌套和混合功能有限。
Sass: 功能强大，支持变量、嵌套、混合、模块化，适合大型项目。
Less: 类似于Sass，语法简洁，功能全面。
Stylus: 语法最简洁，支持变量、嵌套、混合、模块化，灵活性高。

`补充：scss相对于css的优势，scss类似css，sass不用{}`
1.变量：css语法更为繁琐
2.嵌套：CSS目前不支持嵌套，需要手动`编写选择器`。
3.混合: CSS没有内置的混合功能，scss支持强大的混合功能，可以带参数(@maxin,@include)
4.继承: CSS没有直接的继承功能,支持继承，减少重复代码(@extend)
5.运算: CSS支持部分运算(calc)，但不如SCSS灵活。 width: 100% - 20px; padding: 10px / 2;
6.导入：支持@import，但会产生多个HTTP请求，影响性能,scss支持@import，在编译时合并为一个文件
7.模块系统：CSS没有模块系统，所有变量都是全局的。支持模块系统@use和@forward，更好地管理和组织代码。
8.条件循环：CSS没有条件和循环功能，需要借助JavaScript。scss支持条件语句和循环，使样式更具动态性
@mixin theme($theme-name) {
  @if $theme-name == dark {
    background: black;
    color: white;
  } @else if $theme-name == light {
    background: white;
    color: black;
  }
}
body { @include theme(dark); }
9.SCSS有强大的社区和生态系统，提供了许多工具和库（如Compass、Bourbon），使开发更加高效。

`补充：@extend，@use,@forward的用法`
@extend：继承，用于在多个选择器之间共享样式，避免重复代码。
.message {
  border-color: #d6e9c6;
}
.error {
  @extend .message;
  border-color: #ebccd1;
}
@use：用于导入另一个Sass文件中的变量、函数和mixin，并且使用`命名空间`来访问它们,一般配合@forward使用。

## 说说设备像素、css像素、设备独立像素dip、dpr、ppi 之间的区别？
css像素：在没有缩放的情况下，1css像素等于1个设备独立像素
在同一个设备上，每1个 CSS 像素所代表的设备像素是可以变化的（比如调整屏幕的分辨率）
在不同的设备之间，每1个 CSS 像素所代表的设备像素是可以变化的（比如两个不同型号的手机）
`可以把css单位认为是一个虚拟相对的单位，不同的显示器css表示的设备像素是不一定的。`

设备像素：指设备能控制显示的最小物理单位。屏幕生产之后设备像素就是一个固定值，单位pt。和分辨率挂钩
`一个1080p的显示器分辨率是1920x1080，意味着它有1920个水平设备像素和1080个垂直设备像素。当我们调整分辨率时，屏幕显示的宽度和高度会变化，而不是清晰度。`

`DIP(设备独立像素)`：与设备无关的逻辑像素，代表可以通过程序控制使用的`虚拟像素`，是一个总体概念，包括了CSS像素`（分辨率）`:设备独立像素包括了css像素

`DPR(设备像素比)`:设备像素和CSS像素之间的比例关系，`表示一个CSS像素包含多少个设备像素`.
DPR=设备像素/css像素   `对于一个DPR为2的设备来说，一个CSS像素对应2x2的设备像素矩阵，也就是4个设备像素。`
1080 1920分辨率对应的css像素为540px和960px

PPI:每英寸像素，表示每英寸包含的像素点的数目，可以理解为像素密度，数值越高，说明屏幕显示的图像越清晰。
屏幕分辨率：X  Y
PPI = 根号（X的平方+Y的平方）除以屏幕尺寸

`1、无缩放情况下，pc端1个CSS像素等于1个设备独立像素`
2、设备像素由屏幕生产之后就不发生改变，而设备独立像素是一个虚拟单位会发生改变
3、PC端中，1个设备独立像素 = 1个设备像素 （在100%，未缩放的情况下）
`4、在移动端中，标准屏幕（160ppi）下 1个设备独立像素 = 1个设备像素`
5、设备像素比（dpr） = 设备像素 / 设备独立像素
6、每英寸像素（ppi），值越大，图像越清晰

`个人理解：在pc端，我们可以认为px是绝对单位，在移动端认为px是相对单位，px包含在设备独立像素中，由于每一个手机的设备像素比不一致，比如ipone6的设备像素比为2，因此当我们使用1px的时候，实际使用的是2(设备像素)`

`补充：由于pc端的宽高不一致，设置px会出现适配问题`
1、使用媒体查询
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
    margin: 0 auto;
  }
}

/* 适用于中等屏幕 */
@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}

/* 适用于小屏幕 */
@media (max-width: 991px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}
2、使用（flex，grid）布局，比如直接设置比例 flex：1
3、百分比的设置  width：80%
4、使用视口单位 vw,vh
5、使用JavaScript动态调整
6、使用em和rem单位
7、CSS框架（如Tailwind CSS、Bulma）提供了丰富的工具类，帮助快速实现响应式设计

<picture>
  <source srcset="640.png" media="(min-width: 640px)">
  <source srcset="480.png" media="(min-width: 480px)">
  <img src="320.png" alt="">
</picture>   通过picture进行响应式处理

## 如果要做优化，CSS提高性能的方法有哪些？（影响页面性能的指标有哪些？）
1、精简样式文件：很多情况下我们会把多个样式文件合并成一个，因为通常页面之间有公共的样式
缺点：样式文件偏大，`影响首屏加载速度`。浏览器会进行多余的样式匹配，影响渲染时间。
优点：样式文件会被浏览器缓存，进入其它页面时不用下载。
2、利用继承减少代码量
3、内联首屏关键CSS：（内联样式不能缓存，且维护困难），内联样式能够使页面渲染速度提前因为在HTML下载完之后就可以开始渲染，不需要像Link标签引入耗费时间。一般只写一些关键CSS代码，如涉及整体的宽高
4、异步加载css代码：有些css代码在当前用不到的情况下异步加载
`利用 media 属性将 CSS 文件标记为非屏幕样式，当页面加载完成后再更改 media 属性以启用样式。`
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

`使用 JavaScript 动态创建 <link> 标签并插入到页面中。`
<script>
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'styles.css';
  document.head.appendChild(link);
</script>

5、压缩文件：借助一些打包文件进行压缩，比如webpack,gulp/grunt
6、正确使用选择器：通配符尽量少用，不要嵌套太多的选择器，使用id选择器就没必要进行嵌套
7、慎用一些CSS属性：box-shadow,filter,:nth-child
8、慎用@import：这个会影响css文件的并行下载，只有当该文件下载解析完之后才能下载其它css文件
9、减少回流和重绘
10、优化小点：减少高性能属性浮动、定位，属性值为0时，不加单位。把小的icon图片转成base64编码
CSS3动画或者过渡尽量使用transform和opacity来实现动画，不要使用left和top属性

`补充：@import和Link标签的区别`
@import:需要在css文件中使用，早期的浏览器可能不支持，但会增加额外的 HTTP 请求，影响性能。只有当解析到该css文件的这一行时才会进行加载文件，而且这个css文件是`同步单线`加载的，只有加载完这个文件才会加载下一个文件
Link:<link> 标签在 HTML 解析时立即加载 CSS 文件，并行加载，不会阻塞页面渲染。也可以通过JavaScript动态加载。

## 浏览器生成页面的过程
1、当浏览器接收到服务器的 HTML 响应后，开始逐行解析 HTML 标记，并构建 DOM树，`遇到 <script> 标签时，会暂停解析 HTML，开始加载和执行 JavaScript。`，与此同时加载 CSS，浏览器会根据 HTML 中的 <link> 标签或嵌入的 <style> 标签加载并解析 CSS 文件构建 CSSOM 树。
2、构建渲染树：浏览器结合 DOM 树和 CSSOM 树，创建渲染树（Render Tree）。
渲染树节点：渲染树中的每个节点对应一个将被绘制到屏幕上的元素。渲染树不包含隐藏的元素（如 display: none）。
3、计算布局：浏览器通过遍历渲染树，计算每个节点的几何信息（位置和大小），确定页面元素在屏幕上的确切位置。这一步也称为回流（Reflow）。
`布局算法：浏览器使用不同的布局算法处理块级元素、行内元素、浮动元素和其他 CSS 布局特性。`
4、绘制：绘制过程：`浏览器遍历渲染树，将每个节点绘制到屏幕上`。绘制过程包括文本、颜色、图像、边框、阴影等的呈现。
绘制顺序：浏览器按照树的顺序从上到下绘制，每个节点会被绘制成多个图层。
5、现代浏览器使用合成器线程将页面分成多个图层（Layers），每个图层可以独立绘制和更新：
分层：浏览器将渲染树分割成多个图层，这些图层可以独立绘制。
合成图层：浏览器的合成器线程将这些图层合成一个最终的页面。
GPU 加速：使用 GPU 加速渲染图层，提高渲染性能和流畅度。

`总结：`
1、HTML 解析：浏览器解析 HTML，构建 DOM 树。
2、CSS 解析：浏览器解析 CSS，构建 CSSOM 树。
3、构建渲染树：结合 DOM 树和 CSSOM 树，创建渲染树。
4、JavaScript 执行：
  同步脚本：阻塞 HTML 解析，加载并执行。
  异步脚本：异步加载，不阻塞 HTML 解析，加载完成立即执行。
  延迟脚本：异步加载，HTML 解析完成后执行。
5、布局与绘制：计算每个节点的几何信息，绘制页面。
6、事件循环：处理异步任务和事件。

`补充：async和defer的区别`理解：脚本的执行和HTML的解析不能同时进行，defer延时，就是将脚步执行放在后面
异步脚本：通过 async 属性，脚本可以异步加载，但执行时仍会阻塞 HTML 解析[加载时HTML继续解析，执行时HTML暂停解析]
<script src="script.js" async></script>
延迟脚本：通过 defer 属性，脚本可以在 HTML 完全解析后再执行，不会阻塞 HTML 解析
`加载时HTML继续解析，HTML解析完后再执行`
<script src="script.js" defer></script>
 没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，浏览器读到脚步就加载并执行。脚本执行完，再继续解析剩下的 html 未解析的部分。

 `补充：<script type="module"> 标签：类似于defer，代码是模块化的，局部作用域。支持 import 和 export。严格模式下运行，且不污染全局作用域。执行顺序根据依赖关系，不是位置的先后顺序`

 `src和herf的区别`
 src:针对script标签，一般用于引入脚本，会暂停页面的解析
 herf:也会并行下载，但不会停止当前文档的处理，一般用于引入网络资源（图片等），针对a标签和link标签(一般用于引入css文件)。

## 将数字转化为字符串格式
const date = new Date(1695038400000);
console.log(date);
console.log(date.getFullYear()); // 获取年，例如 2024
console.log(date.getMonth()); // 获取月（0-11），例如 8 表示9月
console.log(date.getDate()); // 获取日（1-31），例如 18
console.log(date.getHours()); // 获取小时（0-23）
console.log(date.getMinutes()); // 获取分钟（0-59）
console.log(date.getSeconds()); // 获取秒（0-59）
console.log(date.getMilliseconds()); // 获取毫秒（0-999）
console.log(date.getDay()); // 获取星期几（0-6），0表示星期天
console.log(date.getTime()); // 获取自1970年1月1日以来的毫秒数（时间戳）
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2); // 补齐两位数字
const day = ('0' + date.getDate()).slice(-2);
console.log(`${year}-${month}-${day}`); // 格式化为 YYYY-MM-DD
`注意：可以直接把毫秒数放入Date函数里面`

## 比较Link和@import标签
`link标签在vue项目中可以用于加载全局样式，比如在入口文件中加载index.html`
<link> 标签：HTML 文档在解析时，会同步加载 <link> 引入的 CSS 文件,可以同步加载多个样式表。它不会阻塞 HTML 的解析，但在样式表加载完毕之前，页面不会渲染。<link> 更适合加载外部样式表，尤其是全局样式表。
@import：在 CSS 中使用 @import 会在页面加载完毕后才加载导入的 CSS 文件，因此相较于 <link>，@import 会导致样式加载得更慢。@import 的文件是在解析到该语句时才会加载，不是立即加载的。

<link> 标签：可以在 HTML 文件中使用，且它不仅限于引入 CSS，还可以用于引入其他资源，比如网站的图标（favicon）。
@import：只能在 CSS 文件或 <style> 标签内使用，并且只能导入 CSS 文件。

<link> 标签：由于 <link> 标签引入的 CSS 文件是同步加载的，它的样式会立即应用，通常在解析 HTML 文档时优先加载。
@import：由于 @import 的 CSS 文件加载较晚，可能会影响其优先级，在某些情况下，样式可能会在页面完全渲染后才应用。

<link> 标签：从最早的浏览器版本开始就广泛支持，几乎所有现代浏览器都能良好处理 <link>。
@import：较新的浏览器可以很好地支持 @import，但在早期的浏览器（如 IE5 或更旧版本）中可能存在兼容性问题。

<link> 标签：可以并行加载多个 CSS 文件，浏览器会同时下载多个 <link> 标签指定的资源。
@import：由于 @import 是在解析到该语句时才加载，且依赖于前一个 CSS 文件的加载，导致不能并行加载，会引入额外的延迟。

<link> 标签：推荐用于所有外部样式表的引入，特别是在开发现代 Web 项目时。一般在 <head> 标签中使用 <link> 来引入外部 CSS 文件。
@import：通常用于将多个 CSS 文件组合在一起，或者将某些样式根据条件导入，比如在某些特定条件下导入特定样式表。

<link> 标签：由于是直接在 HTML 中使用的，你可以通过 JavaScript 动态地添加或移除 <link> 标签，从而控制样式表的加载和应用。
@import：只能在 CSS 中使用，无法通过 JavaScript 动态地操作，灵活性不如 <link>。
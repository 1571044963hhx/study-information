## 说说你对webpack的理解？解决了什么问题？
`把我们写的代码转为浏览器可以执行的代码`
Webpack 是一个现代 JavaScript 应用程序的模块打包工具。它的核心功能是将项目中的各种资源（JavaScript、CSS、图片等）视为模块，然后通过一系列加载器和插件，将这些模块打包为可以在浏览器中运行的文件（通常是一个或多个 JavaScript 文件）。

模块化开发： Webpack 支持各种模块化标准（如 ES Modules、CommonJS、AMD），使得开发者可以更好地组织和管理代码。模块化的代码更易于维护、调试和重用。
依赖关系管理： Webpack 通过分析项目中的依赖关系，自动处理模块之间的依赖，避免了手动管理依赖的麻烦，同时确保了模块加载的正确顺序。
文件打包和优化： Webpack 能够将项目中的多个文件（包括 JS、CSS、图片等）打包成一个或多个文件，从而减少了 HTTP 请求数量，提升了页面加载性能。此外，它还支持代码压缩、图片压缩、CSS 提取等优化操作。
代码分割： Webpack 支持代码分割功能，可以将应用程序拆分成多个块（chunks），并按需加载。这种方式可以减少初始加载时间，并提升应用程序的响应速度。
热模块替换： Webpack 提供了热模块替换功能，使得在开发过程中可以实时更新已修改的模块，而不需要刷新整个页面，从而提升了开发效率。
处理非 JavaScript 资源： Webpack 不仅可以处理 JavaScript，还可以通过使用 loader 处理其他类型的文件，例如将 SCSS 或 LESS 编译为 CSS，将 TypeScript 转换为 JavaScript，将图片文件转换为 base64 等。
多环境支持： Webpack 可以根据配置的不同，生成适合开发、生产等不同环境的代码。例如，开发环境下可以保留调试信息，而生产环境下可以进行代码压缩和混淆。

webpack的核心能力：
1、打包压缩：
2、开发服务器：（npm run build）最开始需要打包之后在看效果，npm run serve：启动开发服务器（本地）
    1、浏览器请求开发服务器
    2、开发服务器从内存中拿到打包结果交给浏览器
    3、当源码发生变化时，webpack监听源码目录（重新打包），再去刷新浏览器页面
    4、浏览器页面刷新继续请求开发服务器，开发服务器继续从内存中拿到打包结果。
3、文件指纹：涉及浏览器和服务器之间的关系，浏览器缓存服务器发过来的资源文件，但当（服务器更新文件）文件发生变化时，浏览器不能监听到，因此产生文件指纹功能，只要文件内容发生变化，文件的命名就发生变化。
减少请求和使用最新的代码文件
`在package.json文件中存在analyse指令，运行npm analyse就可以在build文件夹中看到打包之后的结果分析`

## 说说webpack的构建流程? 
1. 初始化阶段：Webpack 从配置文件（如 webpack.config.js）读取并合并用户的配置，然后创建一个 Compiler 实例。这个实例中包含了所有的配置信息和钩子（生命周期函数），接下来它会开始整个构建过程。
2. 编译阶段：Webpack 会从入口点开始递归地解析每个模块的依赖关系。每找到一个新的模块，就会根据模块类型和 loader 规则进行处理。处理后的模块会被加入到依赖图中。
解析入口点： Webpack 根据配置找到入口文件。entry：入口
模块解析与加载： Webpack 使用配置的 loader 处理模块，支持各种资源类型（如 JS、CSS、图片等）。
依赖关系分析： Webpack 通过静态分析，识别模块中引入的依赖，并继续递归地解析这些依赖。
3. 构建阶段：在解析完所有模块的依赖后，Webpack 会开始根据依赖图将模块组合起来。这个过程包括将各个模块转换为浏览器可执行的代码(js代码)，并根据需要进行优化。
模块合并： Webpack 将模块按照依赖关系打包到一个或多个文件中。
代码分割： 根据配置，将代码拆分为多个块，实现按需加载。
4. 优化阶段：在构建完成后，Webpack 会对输出的文件进行一系列优化操作。常见的优化包括：
Tree Shaking： 移除未使用的代码。
代码压缩： 压缩 JS 和 CSS 文件，减少文件体积。
文件指纹（Hashing）： 为文件生成唯一的哈希值，便于浏览器缓存管理。
代码拆分（Splitting）： 将代码拆分成更小的块，按需加载。
5. 输出阶段：根据入口文件及其依赖关系将其打包成一个或多个chunk，再把每个 Chunk 转换成一个单独的文件加入到指定的输出列表（seal方法生成chunk），这步是可以修改输出内容的最后机会。
6. 完成阶段：构建流程完成，Webpack 触发 done 钩子，根据配置确定输出的路径和文件名进行打包。可以在此阶段进行一些后续处理，如通知开发者构建完成、自动刷新浏览器等。

## loader的作用
默认情况下，在遇到import或者load加载模块的时候，webpack只支持对js文件打包，像css、sass、png等这些类型的文件的时候，webpack则无能为力，这时候就需要配置对应的loader进行文件内容的解析。

关于配置loader的方式有三种：
配置方式（推荐）：在 webpack.config.js文件中指定 loader：一般配置test属性表示匹配的规则和use属性表示使用的loader
内联方式：在每个 import 语句中显式指定 loader
CLI 方式：在 shell 命令中指定它们

注意：`因为loader 支持链式调用，链中的每个loader会处理之前已处理过的资源，最终变为js代码。顺序为相反的顺序执行`

babel-loader : 使用 Babel 将 ES6+ 语法转换为 ES5，确保代码兼容老旧浏览器。
css-loader 和 style-loader:
作用: css-loader 使你能够使用 @import 和 url() 这样的方式来处理 CSS 文件的 import 语句。style-loader 则将 CSS 插入到页面的 <style> 标签中，通过 DOM 操作去加载 CSS。。
使用场景: 当你想要在 JavaScript 中引入并应用 CSS 样式时。一般需要配合使用

file-loader 和 url-loader:
作用: file-loader 用于处理文件导入（如图片、字体文件等），将文件输出到构建目录，并返回文件的 URL。url-loader 类似，但在文件大小低于设定值时，会将文件转换为 Base64 字符串，嵌入到代码中。
使用场景: 需要引入并处理图片、字体等静态资源时。

sass-loader:less-loader:postcss-loader:
作用: 将 SCSS/SASS 文件转换为 CSS，通常配合 css-loader 和 style-loader 使用。
使用场景: 在项目中使用 SASS/SCSS 预处理器编写样式时。

ts-loader:
作用: 将 TypeScript 文件转换为 JavaScript 文件。
使用场景: 使用 TypeScript 编写代码时。

html-loader:
导入 HTML 文件中的资源：例如，它可以处理 <img> 标签中的图片路径，并确保这些资源被正确打包和引用。
压缩 HTML 结构：虽然 html-loader 主要是用来解析和导入 HTML，但它可以与其他插件（如 html-minifier）结合使用，进行 HTML 压缩和优化。

vue-loader:
作用: 将 Vue 单文件组件 (.vue 文件) 转换为 JavaScript 模块。
使用场景: 在项目中使用 Vue.js 框架时。

html-minify-loader: 压缩HTML

## plugins
1. HtmlWebpackPlugin
功能：自动生成 HTML 文件，并将打包后的资源（如 CSS 和 JS 文件）注入其中。
解决的问题：
自动化 HTML 文件的生成，避免手动维护。
确保生成的 HTML 文件始终引用最新的资源。

2. MiniCssExtractPlugin
功能：将 CSS 提取为独立的 .css 文件，而不是将其内联在 JavaScript 文件中。
解决的问题：
改善了样式的加载性能，允许浏览器并行加载 CSS 文件。
提高了样式文件的可维护性和可缓存性。

3. CleanWebpackPlugin
功能：在每次构建前清理输出目录（如 dist 文件夹）。
解决的问题：
防止旧文件与新文件混淆，确保输出目录的干净整洁。

4. TerserWebpackPlugin
功能：压缩和优化 JavaScript 代码。
解决的问题：
减少 JavaScript 文件的体积，提高加载速度。
去除不必要的代码，如注释和未使用的变量。

5. CssMinimizerPlugin
功能：压缩 CSS 文件。
解决的问题：
减少 CSS 文件的体积，提高加载速度。

6. DefinePlugin
功能：创建全局常量，可以在代码中使用。
解决的问题：
可以根据不同的环境（如开发或生产）定义不同的变量，控制代码的行为。

7. CopyWebpackPlugin
功能：复制静态文件到输出目录。
解决的问题：
方便地将静态资源（如图片、字体）包含在构建中，而无需手动管理文件。

8. HotModuleReplacementPlugin
功能：启用热模块替换（HMR），允许在运行时更新模块，而不需完全刷新页面。
解决的问题：
提高开发效率，提供更快的反馈循环。

9. ImageMinimizerPlugin
功能：压缩和优化图像文件。
解决的问题：
减少图像文件的体积，提高网页加载速度。

10. BundleAnalyzerPlugin
功能：可视化打包后的文件大小和组成。
解决的问题：
帮助开发者了解哪些文件占用了较多的空间，从而优化打包和依赖。

## loader和plugin的区别

loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中。把js和json外的其它文件转为Webpack可以识别的模块
plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事

1、执行时机不同：entry=>loaders=>output  而插件可以在整个编译期间都起作用
Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过Webpack提供的 API 改变输出结果
对于loader，实质是一个转换器，将A文件进行编译形成B文件，操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程
2、配置方式不同：loader通过module.rules数组配置，plugins 数组中配置。每个插件通常是一个实例化后的对象，并可以通过构造函数传递选项。

## webpack的生命周期

compiler.initialize： 初始化。
compiler.run： 开始构建。
compiler.compilation： 创建编译实例。
compiler.make： 开始一次编译 （每个文件编译时会触发，包括下述红色部分）。
compilation.buildModule： 构建模块。
compilation.seal： 构建完成。
compilation.optimize： 模块优化。
compiler.afterCompile： 所有文件编译完成。
compiler.emit： 输出资源。
compiler.done： 构建过程完成。

## webpack的热更新是如何做到的？原理是什么？
我们在应用运行过程中修改了某个模块，通过自动刷新会导致整个应用的整体刷新，那页面中的状态信息都会丢失
如果使用的是 HMR，就可以实现只将修改的模块实时替换至应用中，不必完全刷新整个应用

如果我们修改并保存css文件，确实能够以不刷新的形式更新到页面中，但是，当我们修改并保存js文件之后，页面依旧自动刷新了，这里并没有触发热模块
所以，HMR 并不像 Webpack 的其他特性一样可以开箱即用，需要有一些额外的操作。们需要去指定哪些模块发生更新时进行HRM，如下代码：
if(module.hot){
    module.hot.accept('./util.js',()=>{
        console.log("util.js更新了")
    })
}

启动时建立 WebSocket 连接：在项目启动时，Webpack 会创建与开发服务器的WebSocket连接，用于在构建完成后接收更新的模块。
构建编译阶段：Webpack 在编译时会在每个模块中注入 HMR 运行时代码。该代码会监听源代码的变化，并通知 HMR runtime 进行处理。
文件监控：Webpack 会监控所有入口文件及其依赖的文件，一旦检测到文件发生变化，会触发重新编译。
构建完成：当编译完成后，Webpack 会将编译结果发送给开发服务器，并通过 WebSocket 通知客户端有新的资源可用。
模块更新：在客户端收到更新通知后，HMR runtime 会与服务器建立一条新的短连接，并请求更新的模块信息。
应用更新：服务器端收到模块请求后，会以增量更新的方式构建新的模块，并通过短连接发送给客户端。
模块替换：在客户端收到新的模块后，HMR runtime 会根据更新策略决定如何替换旧的模块。一般情况下，它会尝试保留应用的状态，例如保留表单数据、滚动位置等。

## 说说如何借助webpack来优化前端性能？
1.JS代码压缩： TerserPlugin 插件
2.CSS代码压缩：css-minimizer-webpack-plugin：CSS压缩通常是去除无用的空格等，
3.Html文件代码压缩：使用HtmlWebpackPlugin插件来生成HTML的模板时候，通过配置属性minify进行html优化
module.exports = {
    plugin:[
        new HtmlwebpackPlugin({
            ...
            minify:{
                minifyCSS:false, // 是否压缩css
                collapseWhitespace:false, // 是否折叠空格
                removeComments:true // 是否移除注释
            }
        })
    ]
} 设置了minify，实际会使用另一个插件html-minifier-terser
4.文件大小压缩(gzip压缩)：`compression-webpack-plugin`，对文件的大小进行压缩，减少http传输过程中宽带的损耗
5.图片压缩：一般在loader里面配置：image-webpack-loader
Tree Shaking：
    1、usedExports：通过标记某些函数是否被使用，之后通过Terser来进行优化的
    2、sideEffects用于告知webpack compiler哪些模块时有副作用，配置方法是在package.json中设置sideEffects属性
    css tree shaking：`purgecss-plugin-webpack`插件
6.代码分离：将代码分离到不同的bundle中，之后我们可以按需加载，或者并行加载这些文件，默认情况下，所有的JavaScript代码（业务代码、第三方依赖、暂时没有用到的模块）在首页全部都加载，就会影响首页的加载速度
    新的 chunk 是否被共享或者是来自 node_modules 的模块;
    新的 chunk 体积在压缩之前是否大于 30kb;
    按需加载 chunk 的并发请求数量小于等于 5 个;
    页面初始加载时的并发请求数量小于等于 3 个;
代码分离可以分出出更小的bundle，以及控制资源加载优先级，提供代码的加载性能，这里通过`splitChunksPlugin`来实现，该插件webpack已经默认安装和集成，只需要配置即可.(一般针对异步请求)
7.内联 chunk:可以通过InlineChunkHtmlPlugin插件将一些chunk的模块内联到html，如runtime的代码（对模块进行解析、加载、模块信息相关的代码），代码量并不大，但是必须加载的

## 如何提高webpack的构建速度？
升级最新版本
优化 loader 配置：使用loader时，可以通过配置include、exclude、test属性来匹配文件，接触include、exclude规定哪些匹配应用loader
合理使用 resolve.extensions：resolve.extensions是解析到文件时自动添加拓展名，不要随便把所有后缀都写在里面，这会调用多次文件的查找，这样就会减慢打包速度。
优化 resolve.modules：
优化 resolve.alias：alias给一些常用的路径起一个别名
使用 DLLPlugin 插件：避免重复编译第三方库
使用 cache-loader：在一些性能开销较大的 loader 之前添加 cache-loader，以将结果缓存到磁盘里，显著提升二次构建速度
terser 启动多线程：使用多进程并行运行来提高构建速度
合理使用 sourceMap：

`服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制`

## 生产环境和开发环境
开发环境：开发人员调试开发的一种环境: 方便调试，保持高效的开发：开发环境调优的目的是提升webpack构建速度。如开启热更新和热模块（HMR）替换、缩小代码编译范围、多线程打包等
生产环境：发布上线的环境: 让程序在生产环境中正常有效的运行：利用缓存、减少代码体积、分包等方式提升页面响应速度。对于spa单页的话通常需要通过优化减少首屏渲染时间
开发环境的需求：
　　　　模块热更新 （本地开启服务，实时更新）
　　　　sourceMap (代码映射，方便打包调试)
　　　　接口代理　 (配置proxyTable解决开发环境中的跨域问题)
　　　　代码规范检查 (代码规范检查工具)
生产环境的需求：
　　　　提取公共代码　 　　
　　　　压缩混淆(压缩混淆代码，清除代码空格，注释等信息使其变得难以阅读)
　　　　文件压缩/base64编码(压缩代码，减少线上环境文件包的大小)
　　　　去除无用的代码
开发环境和生产环境的共同需求：
　　　　入口
　　　　代码处理(loader处理)
　　　　解析配置



vue和react的区别
https://blog.csdn.net/2401_83384536/article/details/139987139
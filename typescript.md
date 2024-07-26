## 面试官：说说你对 typescript 的理解？与 javascript 的区别？
typescript:其是一种`静态类型检查`的语言，提供了`类型注解`，在`代码编译阶段就可以检查出数据类型的错误`,同时扩展了JavaScript的语法，
所以任何现有的JavaScript程序可以不加改变的在TypeScript下工作,为了保证兼容性，typescript在编译阶段需要`编译器编译成纯Javascript来运行`，是为大型应用之开发而设计的语言.
特性：
1、类型批注和编译时类型检查 ：在编译时批注变量类型   [写代码的时候加上类型]
2、类型推断：ts中没有批注变量类型会自动推断变量的类型  [当没有写类型的时候，会根据变量值判断类型]
3、类型擦除：在编译过程中批注的内容和接口会在运行时利用工具擦除
3、接口：ts中用接口来`定义对象类型`
4、枚举：用于取值被限定在一定范围内的场景
5、Mixin：可以接受任意类型的值
5、泛型编程：写代码时使用一些以后才指定的类型
6、名字空间：名字只在该区域内有效，其他区域可重复使用该名字而不冲突
7、元组：元组合并了不同类型的对象，相当于一个可以装不同类型数据的数组


1、TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法
2、TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译，`在ts文件中写js的代码`
3、TypeScript 文件的后缀名 .ts （.ts，.tsx，.dts），JavaScript 文件是 .js
4、`在编写 TypeScript 的文件的时候就会自动编译成 js 文件`
5、相对于JavaScript提供了类型注解，可以在代码编译阶段就可以检查出数据类型的错误

有些第三方库自身提供类型
DefinitelyTyped这个库可以给第三方库设置类型

区别：
         JavaScript                             typescript
语言：      脚本        面向对象编程语言（TypeScript 引入了基于类的面向对象编程特性，支持类、继承、接口等，使得面向对象编程更加方便。extends）
难度：    灵活易学                              需要有脚本编程经验
类型：轻量级解释编程语言（可以直接在浏览器和node中运行）  强类型的面向对象编程语言
拓展：      js                                         ts
耗时：     更快                                编译代码需要时间
数据绑定：没有类型和接口的概念                使用类型和接口表示数据
语法：所有语句写在脚本标签内     一个typescript程序由模块，方法，变量，语句，表达式和注释组成
静态类型：   没有（类型是在运行时确定的）             支持
接口：        没有                                   有
可选参数方法：不支持                                 支持


## 面试官：说说 typescript 的数据类型有哪些？
javascript的七种基本数据类型
1、布尔值
2、null
3、undefined
4、string
5、number
6、bigint
7、symbol

Array：数组    let list: number[] = [1, 2, 3];    let list2: Array<number> = [1, 2, 3];  数组中的所有元素必须是相同的类型。
tuple：元组    它可以存储不同类型的元素，并且每个元素的位置和类型都是固定的   let tuple: [string, number, boolean];
never:永远不存在的值，函数永远不返回， throw new Error(message);
unknown：它是 any 类型的安全替代。使用 unknown 类型的变量在使用前`必须进行类型检查或类型断言`，从而提高类型安全性。
let value: unknown;
value = "Hello";
`此处做了类型检查`
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Safe, "HELLO"
}
value = 42;
if (typeof value === "string") {
  console.log(value.toUpperCase()); // This block won't execute
}

enum:枚举,一般用于枚举API
void:空值，一般用于函数的返回值
any:任何类型    这三个是typescript添加的基本数据类型

`对象类型`
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25,
};
`类型别名（type）`
type StringOrNumber = string | number;
let sample: StringOrNumber;
sample = "hello";
sample = 10;
`接口（interface）`
interface Person {
  name: string;
  age: number;
}
let john: Person = { name: "John", age: 25 };
`类型断言`
当你比 TypeScript 更清楚某个值的确切类型时，可以使用类型断言。 
`value as string  <string>value`
`非空断言`
在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。具体而言，x! 将从 x 值域中排除 null 和 undefined 。
const aLink = document.getElementById('link')! 
//如果没有非空断言，使用aLink时会报错，因为页面可能没有link这个标签，得到的就是undefined

`补充：NAN：表示不是一个合法的数字，属于Numner类型`：获得的时候就需要考虑，某个过程必须要数字但他不是一个数字
1、字符串和数字相减，除和乘（不能相加）
2、0/0
3、Number('abc')
4、Math.sprt(-1) 无效的数学运算
NAN !== NAN,通过方法isNAN判断是否为NAN

## 面试官：说说你对 TypeScript 中枚举类型的理解？应用场景？
枚举类型在 TypeScript 中提供了一种便捷和直观的方式来管理和使用一组`相关的常量(对象的所有可能取值的集合)`。`它们提高了代码的可读性和可维护性.

数字枚举：此处会出现反向映射`枚举值和枚举名可以相互读取`
enum Direction {
  Up = 0,
  Down,
  Left,
  Right
}
编译成JavaScript
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));

console.log(Direction.Up); // 输出: 0
console.log(Direction[0]); // 输出: "Up"
字符串枚举：枚举API
异构枚举：即将数字枚举和字符串枚举结合起来混合起来使用
`一周有七天，有四个方向`，`相对于其他类型，枚举可以提供值，因此可以编译成JavaScript代码，其它类型会在编译成js代码时自动移除`

## 面试官：说说你对 TypeScript 中接口的理解？应用场景？（定义对象的属性和属性类型）
接口:所描述的是一个对象相关的属性和方法，但并不提供具体创建此对象实例的方法,接口为静态类型检查提供了一种手段，可以在编译时确保对象的形状（即属性和方法）符合预期
定义接口：
interface Person {
  name: string;
  age: number;
}
使用接口：
let john: Person = {
  readonly name: "John",
  readonly age？: 25   可选属性和只读属性
  sayHello(): void;  `定义方法和方法返回值的类型,还可以定义函数参数的类型`
};

接口可以通过扩展来实现继承，允许一个接口继承另一个接口的成员(extends)。
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square: Square = {
  color: "blue",
  sideLength: 10
};

`接口可以用来定义具有动态键的对象的形状`
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
使用场景：有一个很长很长的数组  string[]也嫩实现相同的效果，但接口可以继承和组合，更加灵活，可以设置是否需要和能否修改等




let myStr: string = myArray[0];






## 面试官：说说你对 TypeScript 中类的理解？应用场景？
`字段 ： 字段是类里面声明的变量。字段表示对象的有关数据。`
构造函数： 类实例化时调用，可以为类的对象分配内存。
方法： 方法为对象要执行的操作

class Person {
  public name: string;
  private age: number;

  static PI: number = 3.14;
  `静态成员属于类而不是类的实例，可以通过类名直接访问。`

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}
public：默认修饰符，可以在任何地方访问。
private：只能在`类内部`访问。只是`声明`只能在类的内部访问，但编译成JavaScript后实例可以访问
protected：可以在`类内部及其子类`中访问。子类指的是继承的子类，而不是实例化的对象
readonly:只读修饰符
`#和private的区别`:#是只能在类的内部访问，私有性更强

interface Printable {
  print(): void;
}

`类可以实现接口，用于强制类遵循特定的契约。`
class Document implements Printable {
  print() {
    console.log("Printing document...");
  }
}

let doc = new Document();
doc.print(); // 输出: Printing document...

abstract:`抽象类，只能被继承，不能被实例化`
abstract Anaimal{
    abstract connect(): void;
}
通过抽象类可以确保所有子类遵循相同的行为规范和接口，从而在代码中引入统一性和一致性。

`补充：类中getter和setter的理解`:可以在访问时添加一些额外的逻辑，比如日志记录，权限检查等
`定义了一个私有字段，不能访问，可以通过getter和setter函数访问和修改`
class Person {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  // Getter
  get name(): string {
    return this._name;
  }
  // Setter
  set name(newName: string) {
    if (newName && newName.length > 0) {
      this._name = newName;
    } else {
      console.log("Invalid name");
    }
  }
}
let person = new Person("John");
console.log(person.name); // 输出: John
person.name = "Doe";
console.log(person.name); // 输出: Doe
person.name = ""; // 输出: Invalid name
console.log(person.name); // 输出: Doe





## 面试官：说说你对 TypeScript 中函数的理解？与 JavaScript 函数的区别？
从定义的方式而言，typescript 声明函数需要定义参数类型或者声明返回值类型
typescript 在参数中，添加可选参数供使用者选择
typescript 增添函数重载功能，使用者只需要通过查看函数声明的方式，即可知道函数传递的参数个数以及类型
`TypeScript 支持函数重载，可以根据不同的参数类型或数量，以不同的方式处理函数调用`

## 面试官：说说你对 TypeScript 中泛型的理解？应用场景？（类型占位符）
允许在编写`函数、类、接口`时使用类型参数，从而`增强代码的灵活性和重用性`。泛型使得可以编写可复用的组件，能够处理多种类型的数据，同时保持类型安全。
function identity<T>(arg: T): T {
    return arg;
}   可以理解为使用T进行占位
// 使用泛型函数
let result = identity<string>("Hello");
let result2 = identity<number>(123);

class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }
}

`使用泛型类`
let box1 = new Box<string>("Apple");
let box2 = new Box<number>(10);

interface Pair<T, U> {
    first: T;
    second: U;
}

`使用泛型接口`
let pair: Pair<number, string> = { first: 1, second: "two" };


## 面试官：说说你对 TypeScript 中高级类型的理解？有哪些？
1、交叉类型：type AB = A & B; AB 类型即为 A 和 B 接口的交叉类型，obj 对象必须同时包含 a 和 b 属性。
2、联合类型：type s = number | string  对象是数字或者字符串
3、类型别名：type some = boolean | string   type类型别名
4、类型索引：keyof 类似于 Object.keys ，用于获取一个接口中 Key 的联合类型。
typeof：可以获取类型和`interface`类型等
in:用来遍历枚举属性
interface Button {
    type: string
    text: string
}
type ButtonKeys = keyof Button
// 等效于
type ButtonKeys = "type" | "text"
5、类型约束：主要用于对泛型进行约束
type BaseType = string | number | boolean
// 只能是字符串、数字、布尔这几种基础类型
function copy<T extends BaseType>(arg: T): T {
  return arg
}
6、映射类型：映射类型允许根据现有类型创建新类型。通过在旧类型上遍历，并根据旧类型中的每个属性生成新类型中的属性。
7、条件类型：T extends U ? X : Y，如果 T 是 U 的子集，就是类型 X，否则为类型 Y



## 面试官：说说对 TypeScript 中命名空间与模块的理解？区别？
`模块`
TypeScript 与ECMAScript 2015 一样，任何包含顶级 import 或者 export 的文件被当成一个模块
相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的
`命名空间`
命名空间一个最明确的目的就是解决重名问题
命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的
这样，在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中

## 面试官：说说如何在React项目中应用TypeScript？

## 面试官：说说你对装饰器的理解？
装饰器：是一种特殊类型的声明`（方法或者函数）`，它能够附加行为到类、方法、访问器、属性或参数上。通过装饰器可以在不改变原有代码的情况下，动态地修改或扩展其功能。
装饰器在定义时会返回一个函数，该函数会在运行时被调用，并且可以接受一些参数，这些参数取决于装饰器所装饰的元素。
`1、类装饰器（不能传参）`
function express(target){
  target.prototype.name = 'zhangshan'
}
@express   =>express(person)
class person {

}
let p1 = new Person()
console.log(p1.name)  //zhangsan
`2、装饰器工厂(可以传参)`
function express(options:any){ 
  `在这个区域执行的代码是装饰器工厂`
  return function(target:any){
    target.prototype.name = 'zhangshan'   `注意：里面的是类装饰器`
  }
}
@express({name:'zhangshan'}) 
class person {

}
let p1 = new Person()
console.log(p1.name)  //zhangsan
`3、装饰器组合`
`从上至下先执行装饰器工厂，再从下至上执行类装饰器`
`4、属性装饰器`
function express(options){
  return function(target:any,attr:any){    attr装饰的属性
    `此处做具体的操作`
  }
}
`5、方法装饰器`：attr就是方法的名字




## 面试官：说说如何在Vue项目中应用TypeScript？
1、实际开发添加ts即可，将vue后缀改为ts
2、安装npm install vue-class-component vue-property-decorator，使用类的方式来定义组件。



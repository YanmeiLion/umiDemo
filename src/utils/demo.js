const str = 'hi你是乔戈里';
console.log('--str-length--,', str.length);

let symbol_1 = Symbol('foo'),
  symbol_2 = Symbol('qwe');

// symbol类型
const obj_symbol = {
  [symbol_1]: 'foo_value',
  [symbol_2]: 'fqwe_value',
  name: '111',
  age: 21,
};
// console.log('--返回实例的: 常规属性数组--', Object.getOwnPropertyNames(obj_symbol));
// console.log('--返回实例中: 符号属性数组--', Object.getOwnPropertySymbols(obj_symbol));
// console.log('返回全部属性描述符对象--', Object.getOwnPropertyDescriptors(obj_symbol));
// console.log('-返回常规类型的键名-', Object.keys(obj_symbol));
// console.log('-返回实例全部的键名-', Reflect.ownKeys(obj_symbol));

// console.log('取指数-', Math.pow(2, 3), 3 ** 2);

/**
 * 不允许修改已经定义的对象内容 object.freeze()
 */
// const changeObj = { id: 111 };
const changeObj = Object.freeze({ id: 111 }); // { id: 111 }
changeObj.name = 'yanmei';

/**
 * 字符串的一些方法
 * repeat(number)  复制字符串并拼接成一个新的字符串； number：复制次数。
 * padStart(number, "可选填充字符") 复制字符串；number: 指定的字符串长度。 大于number在相应的一边填充可选字符;(前面)
 * padEnd(number, "可选填充字符") 复制字符串；大于number在相应的一边填充可选字符；（后面）
 *
 *
 * const copyCode_str = 'ym-哈哈';
 * eg:
 * 1. copyCode_str.repeat(5)
 * 2. copyCode_str.padStart(8, '0')
 * 3. copyCode_str.padEnd(8, '-+=')
 *
 */

/**
 * 数组的一些方法
 * --查询：
 * eg: const a = ['aa', 'bb', 'ccc', 'efg'];
 * 1. Array.from(a.keys())  返回数组的key
 * 2. Array.from(a.values())  返回数组的值
 * 3. Array.from(a.entries())  返回一个键值对 [ [ 0, 'aa' ], ……]
 *
 *
 * --复制：
 * a.fill('替换的value', '开始下标', '结束下标') ---下标为负数，即反向取值； 没有结束下标，默认到末尾； 没有开始和结束，默认全部替换。
 * a.copyWithin('插入的位置下标', '开始复制的下标', '复制结束的下标')
 *
 *
 * --常用方法:
 * splice(): {
 *  <1>: 删除  splice(开始位置, 结束位置)
 *  <2>: 插入  splice(插入开始位置, 0, 需要插入的项, ……)
 *  <3>: 替换  splice(替换的位置, 要删除几项, 需要插入的项, ……)
 * }
 * push() 尾部添加 ， unshift()——在头部添加
 * pop()——删除最后一个并返回删除的项目， shift()——删除第一个并返回删除的项；
 * connat() 合并数组
 * reverse()——反向排序，  sort()——从小到大排序，升序
 * <---返回查找到的位置下标--->
 * indexOf()  lastIndexOf()
 */

const a = ['aa', 'bb', 'ccc', 'efg'];
// console.log('-fill-', a.fill(1, 10, 10));
console.log('--插入--', a.indexOf('ccc','efg'));

//  Page: 177

import React, { useEffect, useState } from 'react';
import { message } from 'antd';

type propTypes = {
  name: string;
};

// 定义用户登录场景
type User = {
  name: string;
  password: Number;
  code: string;
};

// 已经注册的用户，新类型 (可选类型)
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

// 可选1： MyPartial<User>

// 可选2
type UserPartial = {
  name?: string; // 姓名
  password?: string; // 密码
  address?: string; // 地址
  phone?: string; // 联系电话
  code?: string; // 验证码
};

// 只读类型
type readOnlyType = {
  readonly name: string;
  readonly password: Number;
};

// 通过 + 、— 、来选择增加或删除一些映射 { [ P in K ] : T }
// { readonly [P in K] ?: T}

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]; // Capitalize 字符串首字母大写
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
// {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }

// 通过识别键名，没有就never移除这个类型键值对 Remove the 'kind' property
type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, 'kind'>]: T[K];
};

interface Circle {
  kind: 'circle';
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
//   type KindlessCircle = {
//       radius: number;
//   };

// 分布式条件类型来说，当传入的被检查类型是联合类型的话，在运算过程中会被分解成多个分支
type Exclude<T, U> = T extends U ? never : T; // 包含即 移除never
type Extract<T, U> = T extends U ? T : never; // 不包含即 移除never
type NonNullable<T> = T extends null | undefined ? never : T; // 不包含null 和 undefined类型
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

/**
 *  Pick 可以从一个对象类型中 取出某些属性
 *  Pick<要拾取的类型，要拾取的属性1，要拾取的属性2>
 *
 *
 *  Omit 可以从一个对象类型中 排出某些属性
 *  Omit<要排除的类型，要排除的属性1，要排除的属性2>
 *
 *  interface UserPick {
      id: string;
      token: string;
      code: number;
    }
    type newPick = Pick<UserPick, 'id', 'code'>; // {id: string, code: number }
    type newPick2 = Omit<UserPick, 'id', 'code'>; // {token: string}
 *
 *
 */

// --------------------------------------

const Container: React.FC<propTypes> = (props) => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    console.log('finish');
  }, []);

  return <div>sssss</div>;
};

export default Container;

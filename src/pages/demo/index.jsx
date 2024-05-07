import React, { useEffect, useState } from 'react';
import style from './index.less';
import { Select, Button, Input, Cascader } from 'antd';

import 'emoji-mart/css/emoji-mart.css';

import Father from './childrenComp/father';

const { Option } = Select;

// 表情数组
const emojiArr = [
  '😀',
  '😁',
  '😂',
  '😃',
  '😉',
  '😋',
  '😎',
  '😍',
  '😗',
  '🤗',
  '🤔',
  '😣',
  '😫',
  '😴',
  '😌',
  '🤓',
  '😛',
  '😜',
  '😠',
  '😇',
  '😷',
  '😈',
  '👻',
  '😺',
  '😸',
  '😹',
  '😻',
  '😼',
  '😽',
  '🙀',
  '🙈',
  '🙉',
  '🙊',
  '👼',
  '👮',
  '🕵',
  '💂',
  '👳',
  '🎅',
  '👸',
  '👰',
  '👲',
  '🙍',
  '🙇',
  '🚶',
  '🏃',
  '💃',
  '⛷',
  '🏂',
  '🏌',
  '🏄',
  '🚣',
  '🏊',
  '⛹',
  '🏋',
  '🚴',
  '👫',
  '💪',
  '👈',
  '👉',
  '👆',
  '🖕',
  '👇',
  '🖖',
  '🤘',
  '🖐',
  '👌',
  '👍',
  '👎',
  '✊',
  '👊',
  '👏',
  '🙌',
  '🙏',
  '🐵',
  '🐶',
  '🐇',
  '🐥',
  '🐸',
  '🐌',
  '🐛',
  '🐜',
  '🐝',
  '🍉',
  '🍄',
  '🍔',
  '🍤',
  '🍨',
  '🍪',
  '🎂',
  '🍰',
  '🍾',
  '🍷',
  '🍸',
  '🍺',
  '🌍',
  '🚑',
  '⏰',
  '🌙',
  '🌝',
  '🌞',
  '⭐',
  '🌟',
  '🌠',
  '🌨',
  '🌩',
  '⛄',
  '🔥',
  '🎄',
  '🎈',
  '🎉',
  '🎊',
  '🎁',
  '🎗',
  '🏀',
  '🏈',
  '🎲',
  '🔇',
  '🔈',
  '📣',
  '🔔',
  '🎵',
  '🎷',
  '💰',
  '🖊',
  '📅',
  '✅',
  '❎',
  '💯',
  '💝',
  '❤️',
  '💖',
  '💕',
  '💥',
  '🌸',
  '🌻',
  '🌹',
  '🌿',
  '🍀',
  '🎃',
  '✨',
  '🎇',
  '🎆',
  '🎉',
  '🎈',
  '🎀',
  '🔅',
];

const optionData = [
  { name: '邮箱', value: '${email}' },
  { name: '姓', value: '${family_name}' },
  { name: '名', value: '${first_name}' },
  { name: '地址', value: '${address}' },
  { name: '邮编', value: '${postcode}' },
];

export default function index() {
  const [title, setTitle] = useState('今天天气很好😉hhhh');
  const [showEmoji, setShowEmoji] = useState(false);
  const [currentInset, setCurrentInset] = useState(Number);

  const [sayWord, setSayWord] = useState('');

  // 选中当前表情
  const checkedEmoji = (emojiValue) => {
    let theSubscript = currentInset;
    const newTitle =
      title?.substring(0, theSubscript) +
      emojiValue +
      title?.substring(theSubscript);

    theSubscript = theSubscript + 2;
    setCurrentInset(theSubscript);

    setTitle(newTitle);
    setShowEmoji(false);
  };

  const changeTitle = (e) => {
    const theValue = e?.target?.value;
    setTitle(theValue);
  };

  const titleBlur = (e) => {
    const insert = e?.target?.selectionStart;
    setCurrentInset(insert);
  };

  const chooseVisible = (value) => {
    let theSubscript = currentInset;
    const newTitle =
      title?.substring(0, theSubscript) +
      value +
      title?.substring(theSubscript);

    // 插入变量前范围内 寻找下标，并重新赋值光标位置
    const theIndex = newTitle.indexOf('}', theSubscript) + 1;

    setCurrentInset(theIndex);
    setTitle(newTitle);
  };

  const CascaderOption = [
    {
      value: '',
      label: '弹框',
      children: [
        {
          value: '<',
          label: '小于',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
        {
          value: '>',
          label: '大于',
        },
        {
          value: '=',
          label: '等于',
        },
        {
          value: '<=',
          label: '小于或等于',
        },
        {
          value: '>=',
          label: '大于或等于',
        },
      ],
    },
  ];

  const onCascaderChange = (value) => {
    console.log('级联value', value);
  };

  return (
    <div style={{ padding: '50px' }}>
      <div style={{ height: '200px', border: '1px red solid' }}>
        <Father callback={setSayWord} sayMsg={sayWord} />
      </div>

      <div className={style.imgDiv}>
        图片预览, css不是鼠标悬停
        <img src={require('@/assets/image/descBlock.png')} alt="" />
        <div
          className={style.lookDiv}
          onClick={() => {
            console.log('预览111111111');
          }}
        >
          预览
        </div>
      </div>

      <Cascader
        options={CascaderOption}
        onChange={onCascaderChange}
        placeholder="Please select"
      />

      <Input
        style={{ margin: '40px 0 20px' }}
        value={title}
        onChange={changeTitle}
        onBlur={titleBlur}
      />
      <Button type="primary" onClick={() => setShowEmoji(!showEmoji)}>
        点击展开
      </Button>

      <Select
        onSelect={chooseVisible}
        style={{ width: 120 }}
        // defaultValue={optionData?.[0]?.name}
      >
        {optionData?.map((item) => {
          return (
            <Option value={item?.value} key={item?.name}>
              {item?.name}
            </Option>
          );
        })}
      </Select>

      {showEmoji && (
        <div className={style.emojiList}>
          {emojiArr?.map((item, index) => {
            return (
              <div key={index} onClick={() => checkedEmoji(item)}>
                {item}
              </div>
            );
          })}
        </div>
      )}

      {/* 表情 */}
      {/* <Select
        defaultValue={emojiArr?.[0]}
        onChange={handleChange}
        open={true}
        className={style.SelectDiv}
        listHeight={180}
      >
        {emojiArr?.map((item) => {
          return (
            <Option value={item} key={item}>
              {item}
            </Option>
          );
        })}
      </Select> */}

      {/* <p>emoji-mart 组件</p>
      <div style={{ border: '1px red solid' }}>
        <Picker onClick={chooseEmoji} />
      </div> */}

      <div
        style={{ marginTop: '50px', backgroundColor: '#ddd', padding: '20px' }}
      >
        <div
          id="templateForm"
          style={{
            margin: '0 auto',
            backgroundColor: 'white',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '430px',
            minHeight: '404px',
            // width: '355px',
            // minHeight: '373px',
          }}
        >
          <img
            id="changeColse"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACcSURBVHgBbY9BCsIwEEUnDRShJN1WQ+dqTY/hacwVPIonUBBBVyK6Euw4sbak7fzVzPzH54+2Du95UV7fr8cBBBmHzcqUQeeFvalMBYZPczhCiiCQom1/qGpvN0imwiaFfjdX+7ir0WCYk3fUgQfNRp/UPi/nsOzzT06TBmUTUnPOoE8yR0so3kIHe/HBeXHxQQkSYbvGowRNYGa+ER9Czar0AHEAAAAASUVORK5CYII="
            alt="图片ing"
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              cursor: 'pointer',
            }}
          />
          <div
            id="imgDiv"
            // height: '99px',
            style={{ width: '100%', height: '120px' }}
          >
            <img
              src="https://fanxiteamtest.oss-cn-chengdu.aliyuncs.com/hant/uploads/images/shop/202205/05/_1651732414_SI8oAZuSJr.png"
              alt=""
              id="changeImg"
              style={{
                display: 'block',
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          <div
            id="contentDiv"
            style={{
              padding: '0 30px 30px',
              minHeight: '284px',
              // padding: '0 26px 20px',
              // minHeight: '274px',
              boxSizing: 'border-box',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p
                id="changeTitle"
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  marginBottom: '0px',
                  color: '#000000',
                  textAlign: 'center',
                  marginTop: '20px',
                  lineHeight: '42px',
                }}
              >
                New Customer Discount
              </p>
              <span
                id="changeDesc"
                style={{
                  display: 'block',
                  fontSize: '24px',
                  color: '#ADADAD',
                  textAlign: 'center',
                  marginTop: '10px',
                  lineHeight: '28px',
                }}
              >
                UP TO 50% OFF
              </span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <input
                placeholder="Just leave email"
                disabled=""
                type="text"
                class="ant-input ant-input-disabled"
                value=""
                style={{
                  width: '100%',
                  height: '38px',
                  marginBottom: '16px',
                  padding: '4px 11px',
                  boxSizing: 'border-box',
                  background: '#EBEBEB',
                  border: 'none',
                  textAlign: 'center',
                  color: '#B8B8B8',
                }}
              />
              <p
                id="changeBtn"
                disabled=""
                style={{
                  width: '100%',
                  minHeight: '36px',
                  marginBottom: '0',
                  background: '#9B856E',
                  borderRadius: '2px',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '400',
                  textAlign: 'center',
                  lineHeight: '36px',
                  cursor: 'pointer',
                }}
              >
                <span>GET MY DISCOUNT</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { Sortable } from 'zent'
import './index.less'
import uniqueId from 'lodash/uniqueId';
import _ from 'lodash';
import { itemAdd } from '../../utils/utils'
// import { indexToArray, getItem, setInfo, isPath, getCloneItem, itemRemove, itemAdd } from './utils';

import { Rate, Input, DatePicker, Button } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const GlobalComponent = {
  Rate,
  Input,
  MonthPicker,
  RangePicker,
  WeekPicker,
  Button
}


const leftOptionsData = [
  {
    name: 'Button',
    attr: {
      style: {
        border: '1px solid red',
        width: '130px',
        height: '130px',
      },
      srcOne: require('@/assets/image/morePoint.png'),
      srcTwo: require('@/assets/image/btnBlock.png'),
    },
    label: '按钮',
  },
  {
    name: 'Log',
    attr: {
      style: {
        border: '1px solid red',
        width: '130px',
        height: '130px',
      },
      srcOne: require('@/assets/image/morePoint.png'),
      srcTwo: require('@/assets/image/logoBlock.png'),
    },
    label: 'logo',
  },
  {
    name: 'Img',
    attr: {
      style: {
        border: '1px solid red',
        width: '130px',
        height: '130px',
      },
      srcOne: require('@/assets/image/morePoint.png'),
      srcTwo: require('@/assets/image/imgBlock.png'),
    },
    label: '图片',
  },
  {
    name: 'Title',
    attr: {
      style: {
        border: '1px solid red',
        width: '130px',
        height: '130px',
      },
      srcOne: require('@/assets/image/morePoint.png'),
      srcTwo: require('@/assets/image/titleBlock.png'),
    },
    label: '标题',
  },
  {
    name: 'Desc',
    attr: {
      style: {
        border: '1px solid red',
        width: '130px',
        height: '130px',
      },
      srcOne: require('@/assets/image/morePoint.png'),
      srcTwo: require('@/assets/image/descBlock.png'),
    },
    label: '描述',
  },

  {
    name: 'FreeCode',
    attr: {
      style: {
        border: '1px solid red',
        width: '130px',
        height: '130px',
      },
      srcOne: require('@/assets/image/morePoint.png'),
      srcTwo: require('@/assets/image/freecodeBlock.png'),
    },
    label: '优惠码',
  },
];



const sortableOption = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  group: {
    name: 'formItem',
    pull: true,
    put: true,
  },
}


export default function index() {


  const [rightOptionDatas, setRightOptionDatas] = useState([
    {
      dragElementName: 'Input',
      children: null,
      attr: {
        style: {
          border: '1px solid red',
          width: '330px',
          height: '50px',
        },
        defaultValue: '2222'
      }
    },
    {
      dragElementName: 'Input',
      children: null,
      attr: {
        style: {
          border: '1px solid red',
          width: '330px',
          height: '50px',
        },
        defaultValue: '44444'
      },
    },

  ])


  const onUpdate = (evt) => {
    console.log('evt', evt)

    const currentId = evt.clone.getAttribute('data-id');
    const newItem = _.cloneDeep(leftOptionsData.find(item => (item.name === currentId)))

    let newOneObj = {}
    if (newItem.name === 'Button') {
      newOneObj = {
        dragElementName: 'Button',
        children: null,
        attr: {
          style: {
            width: '330px',
            height: '50px',
            border: '1px solid red',
            backgroundColor: 'blue'
          },
          // type: 'primary'
        },
        btnDesc: '优惠码 add 23232323'
      }
    }

    rightOptionDatas.splice(evt.oldIndex, 1)
    rightOptionDatas.splice(evt.newIndex, 0, newOneObj)

    setRightOptionDatas([])
    setRightOptionDatas(rightOptionDatas)
  }


  // 拖拽的添加方法
  const sortableAdd = (evt) => {
    console.log('eve', evt)
    // 组件名或路径
    const nameOrIndex = evt.clone.getAttribute('data-id');

    // 父节点路径
    const parentPath = evt.path[1].getAttribute('data-id');

    // 拖拽元素的目标路径
    const { newIndex } = evt;
    // 新路径 为根节点时直接使用index
    const newPath = parentPath ? `${parentPath}-${newIndex}` : newIndex;


    // // 判断是否为路径 路径执行移动，非路径为新增
    // if (isPath(nameOrIndex)) {
    //   console.log('1111111')
    //   // 旧的路径index
    //   const oldIndex = nameOrIndex;
    //   // 克隆要移动的元素
    //   const dragItem = getCloneItem(oldIndex, rightOptionDatas)
    //   // 比较路径的上下位置 先执行靠下的数据 再执行考上数据
    //   if (indexToArray(oldIndex) > indexToArray(newPath)) {
    //     // 删除元素 获得新数据
    //     let newTreeData = itemRemove(oldIndex, rightOptionDatas);
    //     // 添加拖拽元素
    //     newTreeData = itemAdd(newPath, newTreeData, dragItem)
    //     // 更新视图
    //     setRightOptionDatas(newTreeData)
    //     return
    //   }
    //   // 添加拖拽元素
    //   let newData = itemAdd(newPath, rightOptionDatas, dragItem)
    //   // 删除元素 获得新数据
    //   newData = itemRemove(oldIndex, newData);

    //   // this.setState({ Data: newData })
    //   setRightOptionDatas(newTreeData)
    //   return
    // }

    // 新增流程 创建元素 => 插入元素 => 更新视图


    const newItem = _.cloneDeep(leftOptionsData.find(item => (item.name === nameOrIndex)))

    let newOneObj = {}
    if (newItem.name === 'Button') {
      newOneObj = {
        dragElementName: 'Button',
        children: null,
        attr: {
          style: {
            width: '330px',
            height: '50px',
            border: '1px solid red'
          },
          type: 'primary'
        },
        btnDesc: '优惠码 add 添加'
      }
    }

    let Data = itemAdd(newPath, rightOptionDatas, newOneObj)

    evt.item.parentNode.removeChild(evt.item)

    setRightOptionDatas([...Data])
  }




  //渲染右边视图列表函数
  const loop = (arr, index) => {
    console.log('arr', arr)

    return (
      arr.map((item, i) => {
        const indexs = index === '' ? String(i) : `${index}-${i}`;
        if (item) {
          if (item.children) {
            return (
              <div {...item.arr} data-id={indexs} key={indexs}>
                <Sortable
                  key={uniqueId()}
                  style={{ minHeight: 100, margin: 10 }}
                  ref={c => c && c.sortable}
                  options={{
                    ...sortableOption,
                    // onUpdate: e => sortableUpdate(e),
                    // onAdd: e => sortableAdd(e),
                    // onChoose: e => sortableChoose(e),
                    // onSort: e => setIsChoose(false),
                  }}
                >
                  {loop(item.children, indexs)}
                </Sortable>
              </div>
            )
          }
          else {
            const ComponentInfo = GlobalComponent[item.dragElementName]
            return (
              <div
                data-id={item.dragElementName}
                key={indexs}
                type={item.name}
              >
                <ComponentInfo key={indexs} {...item.attr}>
                  {!item.btnDesc ? null : item.btnDesc}
                </ComponentInfo>
              </div>
            )
          }
        }
      })
    )
  }


  const showText = () =>{
    console.log('222')
    const text = document.querySelector('#textdiv')
    console.log('text', text)
  }

  return (
    <div style={{ display: 'flex' }}>
      sortable


      <Sortable
        group={{
          name: 'groupName',
          pull: 'clone',
          put: false,
          revertClone: true
        }}
        animation={220}
        // delay={2}
        scroll={true}
        sort={false} // 设为false，禁止sort
      // onChoose={dragInto}
      >
        {leftOptionsData.map((item) => {
          return (
            <div
              className='emailLeftBlock'
              data-id={item?.name}
              key={item?.name}
            >
              <img src={item.attr.srcOne} alt="" />
              <img src={item.attr.srcTwo} alt="" />
              <p>{item.label}</p>
            </div>
          );
        })}

      </Sortable>


      <div style={{ border: '1px blue solid', width: '50%', height: '500px', overflowY: 'scroll' }}>

        <Sortable
          group={{
            name: 'groupName',
            pull: 'clone',
            put: true,
            // revertClone: true
          }}
          scroll={true}
          animation={220}
          // delay={2}
          onUpdate={onUpdate}
          onAdd={sortableAdd}
        >

          {loop(rightOptionDatas, '')}


          <div className='textDiv' id='textdiv'
            style={{
              marginTop: '50px',
              marginLeft: '30px',
              width: '200px',
              height: '50px',
              lineHeight: '50px',
              textAlign: "center"
            }}
            onClick={showText}
          >
            伪元素事件demo
          </div>


        </Sortable>

      </div>





    </div>
  )
}


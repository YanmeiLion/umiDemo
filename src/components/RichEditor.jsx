
import React, { useEffect, useRef, useState } from 'react'
import { SketchPicker } from 'react-color'
import request from 'umi-request'

import { styleToObj, ObjToString } from '../utils/styleTranstion'



export default function RichEditor() {
  const titleRef = useRef()

  const richHtml = "<p style='color: blue; font-size: 20px' id='title'>这是富文本编辑器</p>";

  // 色条颜色
  const [materialColor, setMaterialColor] = useState('#000000')
  // false 不显示 (true 显示)
  const [showPicker, setShowPicker] = useState(false)

  const [html, setHtml] = useState();
  const [titleStyle, setTitleStyle] = useState()

  useEffect(() => {
    if (html) {
      getDomStyle()
    }
  }, [html])

  useEffect(() => {
    changeStyle()
  }, [materialColor])

  useEffect(() => {

    if (titleStyle) {
      // 对象转字符串
      const StingSty = ObjToString(titleStyle)
      // console.log('ddd', document.querySelector('#templateForm #changeTitle').style.cssText)
      if (html) {
        document.querySelector('#templateForm #changeTitle').style.cssText = StingSty
      }
    }

  }, [titleStyle])



  // 获取节点样式
  const getDomStyle = () => {
    const changeTitle = document.querySelector('#templateForm #changeTitle')

    if (changeTitle) {
      const theStyles = changeTitle.getAttribute('style')
      // 字符串转对象
      const ObjSty = styleToObj(theStyles)
      setTitleStyle(ObjSty)
    }

  }




  // 设置
  const handleColorChange = colorCode => {
    setMaterialColor(colorCode.hex)
  }
  // 点击色条
  const checkColor = (e) => {
    setShowPicker(!showPicker)
    console.log('checkColor', e)
    //   e.nativeEvent.stopImmediatePropagation();
    // e.isPropagationStopped()
    e.stopPropagation()
  }


  // 改变样式
  const changeStyle = () => {

    setTitleStyle({
      ...titleStyle,
      color: materialColor
    })
  }

  request.get(
    'https://develop-edm-lf.sz1.codefriend.top/api/mailCollect/template/1?timestamps=344324234234&shop=snubbed7.hotishop.com&hmac=fe63830d1640915fe49a8e6b71b57570605a0576547af70b50977bc721aa205b'
  )
    .then((res) => {
      // console.log("res", res)
      setHtml(res?.data?.template_html?.template_html)
    })
    .catch((err) => {
      console.log("err", err)
    })

  const onClickPicker = () => {
    setShowPicker(false)
  }
  const stopClose = (e) => {
    console.log("不关闭")
    // 取消冒泡行为
    e.stopPropagation()
  }


  return (
    <div onClick={onClickPicker} style={{ border: '1px red solid' }}>
      <div id='richDiv' dangerouslySetInnerHTML={{ __html: html }} >
        {/* <p style={{color: 'blue', fontSize: '20px'}} ref={titleRef}>这是富文本编辑器</p> */}

      </div>


    
      <div>颜色拾取， 取色板</div>
      <div style={{ width: '50px', height: '20px', backgroundColor: materialColor }}
        onClick={checkColor}>
      </div>
      {
        showPicker &&
        <div onClick={stopClose} style={{border: '1px blue solid'}}>
          <SketchPicker onChange={handleColorChange} color={materialColor}  />
        </div>        
      }


    </div>
  )
}

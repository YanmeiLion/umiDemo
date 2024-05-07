

// 样式转对象
export const styleToObj = (style) => {
  if (!style || style == '') { return }
  var Arr = style.split(';')
  Arr = Arr.filter(item => {
    return item != ''
  })
  
  let obj = {}
  Arr.forEach(element => {
    let pos = element.indexOf(':')
    let key = element.substring(0, pos).trim()
    let val = element.substring(pos + 1, element.length).trim()
    obj[key] = val
  });
  return obj
}

/**
* 去掉字符串前后所有空格
*/
export const trim = (str, isglobal) => {
  var result
  result = str.replace(/(^\s+)|(\s+$)/g, '')
  if (isglobal && isglobal.toLowerCase() === 'g') {
    result = result.replace(/\s/g, '')
  }
  return result
}


// 对象转字符串
export const ObjToString = (style) => {
  let s = []
  for (let i in style) {
    s.push(i + ':' + style[i]);
  }
  s = s.join(';')
  return s
}

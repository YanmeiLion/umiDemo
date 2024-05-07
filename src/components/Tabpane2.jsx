import React, {useEffect} from 'react'

export default function Tabpane2() {

  useEffect(() => {
    return () => {
      console.log("tabpane2  被销毁了");
    }
  }, [])

  return (
    <div>
      222222222222222222
    </div>
  )
}

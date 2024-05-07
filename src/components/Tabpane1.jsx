import React, { useEffect } from 'react'


export default function Tabpane1(props) {


  useEffect(() => {
    return () => {
      console.log("tabpane1 被销毁了")
      localStorage.setItem('data', 11111111111)
    }
  }, [])

  return (
    <div>
      111111111111111
    </div>
  )
}

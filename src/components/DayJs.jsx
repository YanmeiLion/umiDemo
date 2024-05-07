import React from 'react'
import { createBuilderStatusReporter } from 'typescript'

const dayjs = require('dayjs')
dayjs().format()

// 时区之间解析
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

export default function DayJs() {

  dayjs.tz("2013-11-18 11:55", "America/New_York")

  // console.log('tomaro', dayjs.tz("2013-11-18 11:55", "America/Toronto"))

  // console.log('111', dayjs())
  

  var moment = require('moment-timezone')
  var timeZ = moment.tz.names()
  // zonesForCountry   // 所有国家时区
  var allMoment = [];
  console.log('11', moment.tz('Pacific/Honolulu').format('Z'))
  

  // console.log('timeZ', timeZ)

  // for (var i in timeZ) {
  //   allMoment.push(" (GMT" + moment.tz(timeZ[i]).format('Z') + ")" + timeZ[i]);
  // }

  // console.log('所有时区', allMoment)





  // var timeZones = dayjs().format('Z')

  // console.log(timeZones)

  // var offTmz = []

  // for(var i in timeZones){
  //   offTmz.push("(GMT "+ dayjs(timeZones[i]).format('Z') + ")" + timeZones[i])
  // }

  // console.log('11111', offTmz)


  return (
    <div>
      <p style={{ marginTop: '60px' }}>日期： day.js</p>

      <select>
        <option value="">11111111</option>
        <option value="">2222222222</option>
        <option value="">33333333</option>
        <option value="">444444444</option>
      </select>

    </div>
  )
}

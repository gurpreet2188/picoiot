'use client'

import React, { useEffect, useRef, useState } from 'react'
import Graph from './Graph'
import Current from './Current'
import Command from './Command'

function Body() {
  const bodyRef = useRef(null)
  const [timeRange, setTimeRange] = useState("PT1H")
  const [screenWidth, setScreenWidth] = useState(0)
  const [temperature, setTemperature] = useState()
  const [humidity, setHumidity] = useState()
  const [eCO2, seteCO2] = useState()
  const [tvoc, setTVOC] = useState()
  const [current, setCurrent] = useState()

  const dataTypes = ["Temperature", "Humidity", "eCO2", "TVOC"]
  const valueTypes = [temperature, humidity, eCO2, tvoc]
  const units = ["c", "%", "ppm", "ppb"]

  // const values = {
  //   "T" : {"name": "Temperature", "value": temperature},
  //   "H" : {"name": "Humidity", "value": humidity},
  //   "C" : {"name": "eCO2", "value": eCO2},
  //   "V" : {"name": "TVOC", "value": tvoc},
  // }



  const fetchData = async (window) => {
    const query = {
      "cols": dataTypes,
      "time": window
    }
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query)
    })

    const resData = await res.json()
    return await resData

  }

  useEffect(() => {
    let check = true

    if (check) {
      fetchData(timeRange).then(data => {
        if (data.results) {
          setTemperature(data.results.map(v => v[dataTypes[0]]))
          setHumidity(data.results.map(v => v[dataTypes[1]]))
          seteCO2(data.results.map(v => v[dataTypes[2]] === 400 ? 0 : v[dataTypes[2]]))
          setTVOC(data.results.map(v => v[dataTypes[3]]))
        }
      })
    }
    return () => check = false
  }, [timeRange])


  useEffect(() => {
    let check = true

    if (check) {

      const getCurrentData = () => {
        fetchData('PT2M').then(data => {
          setCurrent([data.results.at(-1)[dataTypes[0]],
          data.results.at(-1)[dataTypes[1]],
          data.results.at(-1)[dataTypes[2]],
          data.results.at(-1)[dataTypes[3]]])
        })
      }

      getCurrentData()
      const updateData = setInterval(() => {
        getCurrentData()
      }, 60000)
    }

    return () => { check = false }
  }, [])


  useEffect(() => {
    let check = true

    if (check && bodyRef.current) {
      setScreenWidth(bodyRef.current.clientWidth)

    }

    return () => check = false
  }, [bodyRef.current])

  const timeRangeBtn = (v) => {
    setTimeRange(`PT${v}H`)
  }

  // console.log(temperature ? temperature[0] : 0)
  return (
    <div className='flex flex-col gap-8 md:gap-[6rem] items-center justify-center h-[100%] w-screen md:w-[90%]' ref={bodyRef}>
      <div className='flex flex-col gap-4 items-center justify-center h-[100%] w-screen md:w-[90%]'>

        <h3 className='tracking-wider self-start text-[1.5rem] md:text-[2rem] md:ml-9 ml-1'>Current</h3>
        <Current values={current} names={dataTypes} units={units} />
      </div>
      <div className='flex flex-col gap-4 items-center justify-center h-[100%] w-screen md:w-[90%]'>

        <h3 className='tracking-wider self-start text-[1.5rem] md:text-[2rem]  md:ml-9 ml-1'>Historical</h3>
        <div className='flex flex-row gap-[1.2rem] self-end pr-8 md:pr-12'>
          <p>Time Range (hr)</p>
          {[1, 2, 4, 8].map((v, i) => {
            return (
              <button key={i + "b"} className={`bg-transparent ${timeRange === `PT${v}H` ? 'text-gray-900 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}`} onClick={() => { timeRangeBtn(v) }}>{v}</button>)
          })}
        </div>
        <div className='flex flex-col gap-4 items-center justify-center md:flex-row md:flex-wrap md:w-[100%] w-screen'>

          {temperature ? dataTypes.map((v, i) => {
            return (
              <Graph key={i + "g"} width={screenWidth > 400 ? 400 : screenWidth - 60} height={200} dataList={valueTypes[i]} dataType={v} />
           )

          }) : "Loading....."}

        </div>
      </div>

      <Command />
    </div>
  )
}

export default Body
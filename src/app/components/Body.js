'use client'

import React, {useEffect, useRef, useState } from 'react'
import Graph from './Graph'

function Body() {
  const bodyRef = useRef(null)
  const [timeRange, setTimeRange] = useState("PT8H")
  const [screenWidth ,setScreenWidth] = useState(0)
  const [temperature, setTemperature] = useState()
  const [humidity, setHumidity] = useState()
  const [eCO2, seteCO2] = useState()
  const [tvoc, setTVOC] = useState()
  const [loading, setLoading] = useState(false)

  const dataTypes = ["Temperature", "Humidity", "eCO2", "TVOC"]
  const valueTypes = [temperature, humidity, eCO2, tvoc]
  useEffect(() => {
    let check = true

    const query = {
      "cols": dataTypes,
      "time": timeRange
    }
    if (check) {
      
      const f = async () => {
        const res = await fetch('/api/query', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query)
        })

        const resData = await res.json()
        
       if(resData.results) {
        setTemperature(resData.results.map(v => v.Temperature))
        setHumidity(resData.results.map(v => v.Humidity))
        seteCO2(resData.results.map(v => v[dataTypes[2]] === 400 ? 0 : v[dataTypes[2]]))
        setTVOC(resData.results.map(v => v[dataTypes[3]]))
       } 
      
      }
      setLoading(true)
      f()
      setLoading(false)
      const updateData = setInterval(()=> {
        f()
      }, 60000)
    }
    check = false
  }, [timeRange])

  useEffect(()=>{
      let check = true

      if (check && bodyRef.current){
        setScreenWidth(bodyRef.current.clientWidth)
        
      }

      return () => check = false
  },[bodyRef.current])

  const timeRangeBtn = (v) =>{
      setTimeRange(`PT${v}H`)
  }

  console.log("test",screenWidth)

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-[100%] w-screen md:w-[90%]' ref={bodyRef}>
      <div className='flex flex-row gap-[1.2rem] self-end pr-8 md:pr-12'>
        <p>Time Range (hr)</p>
        {[1,2,4,8].map((v,i) => {
          return (<>
            <button key={i+v} className='bg-transparent' style={{opacity: timeRange === `PT${v}H` ? 0.7: 0.4}} onClick={()=>{timeRangeBtn(v)}}>{v}</button>
          </>)
        })}
      </div> 
     <div className='flex flex-col gap-4 items-center justify-center md:flex-row md:flex-wrap md:w-[100%] w-screen'>

      {temperature ? dataTypes.map((v,i) =>{
      return (<>
      <Graph key={i} width={screenWidth > 400 ? 400: screenWidth - 60} height={200} dataList={valueTypes[i]} dataType={v} loading={loading}/> 
      </>)

      }): "Loading....."}
      
     </div>
    </div>
  )
}

export default Body
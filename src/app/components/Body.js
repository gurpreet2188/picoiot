'use client'

import React, {useEffect, useRef, useState } from 'react'
import Graph from './Graph'

function Body() {
  const bodyRef = useRef(null)
  const [timeRange, setTimeRange] = useState("PT1H")
  const [screenWidth ,setScreenWidth] = useState(0)
  const [temperature, setTemperature] = useState()
  const [humidity, setHumidity] = useState()
  const [eCO2, seteCO2] = useState()
  const [tvoc, setTVOC] = useState()
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    let check = true

    const query = {
      "cols": ["Temperature", "Humidity", "eCO2", "TVOC"],
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
        seteCO2(resData.results.map(v => v['eCO2'] === 400 ? 0 : v['eCO2']))
        setTVOC(resData.results.map(v => v['TVOC']))
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

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-[100%] w-screen md:w-[90%] md:flex-row md:flex-wrap' ref={bodyRef}>
      <div className='flex flex-row gap-[1.2rem] self-end pr-8'>
        <p>Time Range (hr)</p>
        {[1,2,4,8].map(v => {
          return (<>
            <button className='bg-transparent' style={{opacity: timeRange === `PT${v}H` ? 0.7: 0.4}} onClick={()=>{timeRangeBtn(v)}}>{v}</button>
          </>)
        })}
      </div>
     {temperature ? 
     <>
      
      <Graph width={screenWidth >500 ? 420:  screenWidth - 60} height={200} dataList={temperature ? temperature : [1,2]} dataType={"Temperature"} loading={loading}/> 
     
      <Graph width={screenWidth >500 ? 420:  screenWidth - 60} height={200} dataList={humidity ? humidity : [1,2]} dataType={"Humidity"} loading={loading}/> 
     
       <Graph width={screenWidth >500 ? 420:  screenWidth - 60} height={200} dataList={eCO2 ? eCO2 : [1,2]} dataType={"eCO2"} loading={loading}/> 
      
       <Graph width={screenWidth >500 ? 420:  screenWidth - 60} height={200} dataList={tvoc ? tvoc : [1,2]} dataType={"TVOC"} loading={loading}/>
     </> :
      <>
        <p className='text-2xl'>
          Loading Telemetry Data from 
        </p>
        <p className='text-2xl'>
          Azure IoT Central
        </p>
      </>
    }
    </div>
  )
}

export default Body
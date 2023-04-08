'use client'

import React, {useEffect, useRef, useState } from 'react'
import Graph from './Graph'

function Body() {
  const bodyRef = useRef(null)
  const [screenWidth ,setScreenWidth] = useState(0)
  const [data, setData] = useState({})
  const [temperature, setTemperature] = useState()
  const [humidity, setHumidity] = useState()
  const [eCO2, seteCO2] = useState()
  const [tvoc, setTVOC] = useState()


  useEffect(() => {
    let check = true

    const query = {
      "cols": ["Temperature", "Humidity", "eCO2", "TVOC"],
      "time": "PT8H"
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
        seteCO2(resData.results.map(v => v['eCO2']))
        setTVOC(resData.results.map(v => v['TVOC']))
       } 
      
      }
      f()
    }
    check = false
  }, [])

  useEffect(()=>{
      let check = true

      if (check && bodyRef.current){
        setScreenWidth(bodyRef.current.clientWidth)
      }

      return () => check = false
  },[bodyRef.current])

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-[100%] w-screen md:w-[90%] ' ref={bodyRef}>
     {temperature ? 
     <>
      
      <Graph width={screenWidth - 20} height={200} dataList={temperature ? temperature : [1,2]} dataType={"Temperature"} /> 
     
      <Graph width={screenWidth - 20} height={200} dataList={humidity ? humidity : [1,2]} dataType={"Humidity"}/> 
     
       <Graph width={screenWidth - 20} height={200} dataList={eCO2 ? eCO2 : [1,2]} dataType={"eCO2"} /> 
      
       <Graph width={screenWidth - 20} height={200} dataList={tvoc ? tvoc : [1,2]} dataType={"TVOC"}/>
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
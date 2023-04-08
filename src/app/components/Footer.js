import React from 'react'

function Footer() {
  return (
    <div className='flex flex-col justify-center items-center gap-4 mt-6 p-6'>
        <p>Telemetry data from Azure IoT Central via Fetch API</p>
        <p>Device: Raspberry Pi Pico W</p>
        <p>Protocol: MQTT for Device to Cloud</p>
        <a className='font-bold' href='https://github.com/gurpreet2188/picoiot'> Made by Gurpreet Singh, source code: Github</a>
        
    </div>
  )
}

export default Footer
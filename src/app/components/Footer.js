import React from 'react'

function Footer() {
  return (
    <div className='flex flex-col justify-center items-center gap-4 p-6 border-t-2 border-black/20'>
        <p className='text-center'>Telemetry data from Azure IoT Central via Fetch API</p>
        <p>Device: Raspberry Pi Pico W</p>
        <p>Protocol: MQTT for Device to Cloud</p>
        <a className='font-bold' href='https://github.com/gurpreet2188/picoiot'> Made by Gurpreet Singh, source code: Github</a>
    </div>
  )
}

export default Footer
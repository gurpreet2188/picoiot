import React from 'react'

function Footer() {
  return (
    <div className='flex flex-col justify-center items-center gap-4 p-6 text-center opacity-60 border-t-2 border-black/20 dark:border-white/20'>
        <p>Telemetry data from Azure IoT Central via Fetch API</p>
        <p>Device: Raspberry Pi Pico W</p>
        <p>MQTT Protocol</p>
        <a className='font-bold' href='https://github.com/gurpreet2188/picoiot'> By Gurpreet Singh, source code: Github</a>
    </div>
  )
}

export default Footer
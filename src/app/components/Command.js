'use client'
import React, { useState, useRef } from 'react'

function Command() {
    const [pass, setPass] = useState('')
    const [msg, setMsg] = useState('')
    const [res, setRes] = useState()
    const formRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setRes()
        const command = { "pass": pass, "msg": { "oled": msg.split(" ") } }
        const res = await fetch('/api/command', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(command)
        })

        const resData = await res.json()
        console.log(resData)
        setRes(resData)

        formRef.current.reset()
    }

    const inputStyles = 'h-[3rem] bg-transparent text-white placeholder-white border border-white/10 p-2'

    return (
        <div className='bg-slate-700 flex flex-col gap-4 text-white p-4 rounded-md shadow-lg w-[90%]'>
            <p className='text-xlg font-bold'>Send Command to Pico W</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 ' ref={formRef}>
                <input type='password' placeholder='Enter Command password' onChange={(e) => { setPass(e.target.value) }} className={inputStyles} />
                <input type='text' placeholder='Enter One or Two Word Message' onChange={(e) => { setMsg(e.target.value) }} className={inputStyles} />
                <button type='submit' className='p-2 bg-slate-300 text-black'>Submit</button>
            </form>
            <p>{res ? res.msg === 'failed' ? "Failed" : "Message Sent" : ""}</p>
        </div>
    )
}

export default Command
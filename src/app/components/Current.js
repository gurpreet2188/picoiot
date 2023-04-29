import React from 'react'

function Current({ values, names, units }) {

    return (
        <div className='flex flex-row flex-wrap gap-8 justify-center items-center p-4 w-[100%]'>
            {values?.map((v, i) => {

                return (
                        <div key={i + "a"} className='flex flex-col justify-center items-center p-2 gap-4 bg-white/50 w-[40%] rounded-lg shadow-lg'>
                            <h3 className='text-[1.5rem] md:text-[4rem] md:opacity-70 md:font-light tracking-wide'>{v ? v.at(-1) : "Loading.."}</h3>
                            <p className='text-[0.7rem] md:text-sm opacity-70 tracking-wider'>{`${names[i]} (${units[i]})`}</p>
                        </div>
                )
            })}
        </div>
    )
}

export default Current
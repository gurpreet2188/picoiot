function Graph({ width, height, dataList, dataType }) {
    const offset = 20
    width -= offset
    height -= offset
    const minVal = Math.min(...dataList)
    const maxVal = Math.max(...dataList)
    const yAxis = setYAxis(dataList, 0.1, 0.1, height, maxVal, minVal)
    const xAxis = setXAxis(dataList, width)
    const xyAxis = yAxis.map((v, i) => xAxis[i] + ',' + v)

    
    return (
        <div className={`bg-slate-700 rounded-md p-[20px] shadow-md`}>
            <svg width={width} height={height} >

                <polyline
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                    opacity={0.4}
                    points={`${xyAxis}`} />

                 <text x={width / 2} y={height / 2} dominantBaseline={'middle'} textAnchor="middle" style={{ fill: '#fff', opacity: 0.2, fontSize: "2.5rem" }}>{dataType}</text>

                <text x='10' y={20} style={{ fill: '#fff', opacity: 0.6 }}>{maxVal !== 0 ? maxVal : 200}</text>
                <text x='10' style={{ fill: '#fff', opacity: 0.6 }} y={height / 2}>{maxVal !== 0 ? (minVal + maxVal) / 2 : 100}</text>
                <text x='10' style={{ fill: '#fff' , opacity: 0.6}} y={height - 10}>{minVal}</text>
            </svg>
        </div>
    )
}


function setYAxis(vals, yMax, yMin, h, maxVal, minVal) {
    // h -= 40
    let yAxis = []
    //add & subtract % to Max and from Min val
    // so that actual data is always in middle of graph 

    maxVal += (maxVal * yMax)
    minVal < 0 ? minVal += (minVal * yMin) : minVal -= (minVal * yMin)

    vals.forEach((v, i) => {
        // get difference between *default* highest  and lowerst value
        const diff = maxVal - minVal
        // get differnce between value and *default* hightest value
        const diffV = maxVal - v
        // get difference between diff and diffV values
        const diffFinal = diff - diffV

        let diffInPCT = (diffFinal && diff) !== 0 ? diffFinal / diff : 0
        yAxis.push((h - (h * diffInPCT)))

    })

    return yAxis
}

function setXAxis(vals, w) {
    // w -= 40
    const baseNum = w / (vals.length - 1)
    let xAxis = []
    for (let i = 0; i <= vals.length; i++) {
        xAxis = [...xAxis, baseNum * i]
    }
    return xAxis
}

export default Graph
export async function POST(request) {
    const req = await request.json()
    const url = `https://${process.env.itocName}.azureiotcentral.com/api/query?api-version=2022-10-31-preview`
    const query = {
        "query": `SELECT $ts, ${req.cols.join()} FROM ${process.env.templateID} WHERE WITHIN_WINDOW(${req.time})`
    }
    const f = await fetch(url, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            "Authorization": process.env.auth
        },
        body: JSON.stringify(query)
    })
    const data = await f.json()
    
    return new Response(JSON.stringify(data))
}
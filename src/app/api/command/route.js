export async function POST(request) {
    const req = await request.json()
    const url = `https://${process.env.itocName}.azureiotcentral.com/api/devices/${process.env.deviceID}/commands/msg?api-version=2022-07-31`
    const command = {
        "request": req.msg
    }
    console.log(req)
    let data = {"msg": "failed"}
    if (req.pass === process.env.commandPass)  {
        const f = await fetch(url, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Authorization": process.env.auth
            },
            body: JSON.stringify(command)
        })
        data = await f.json()
    }
    
    return new Response(JSON.stringify(data))
}
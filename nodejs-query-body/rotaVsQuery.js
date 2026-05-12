const http = require('http')

const url = require('url')

//pathname = rota
//query = dados enviados pela url 


const serverNew = http.createServer((req,res) => {
    //converte a url em texto 
    const dadosUrl = url.parse(req.url,true)

    // dados importante 

    const rota = dadosUrl.pathname
    const query = dadosUrl.query

    if(rota === "/teste" && req.method === 'GET'){
        res.end(JSON.stringify({
            vaiTomar: "certo", 
            dadosRecebido: query
        }))
        return
    }
    res.end('rota não localizada')
})

serverNew.listen(3000, () => {
    console.log("server on http://localhost:3000")
})
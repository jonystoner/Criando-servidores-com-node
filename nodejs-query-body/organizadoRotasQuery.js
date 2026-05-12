const http = require('http')

const url = require('url')

const servidor = http.createServer((req,res) => {
    const dadosUrlCompleta = url.parse(req.url, true)

    const query = dadosUrlCompleta.query

    const rota = dadosUrlCompleta.pathname
    //o tipo de dado que vai ser colocar como tipo de dado da resposta é um  json
    res.setHeader('Content-Type', 'application/json');

    if(rota === "/novo" && req.method === "GET") {
        res.end(JSON.stringify({
            mensagem: rota,
            dadosUrl: query
        }))
        return
    };

    if(rota === "/dados" && req.method === "POST"){
        let body = ""

        req.on('data', parte => {
            body += parte
        })

        req.on('end', () => {
            //transformando os dados numa string
            const dados = JSON.parse(body);

            console.log("objeto", dados)

            res.end(JSON.stringify({
                mensagem: "funcionando",
                dados: dados

            }));

        });
        return;
    };



    res.end(JSON.stringify({
        mensagem: "rota não encontrada"
    }));
})

servidor.listen(3000, () =>{
    console.log("servidor on http://localhost/3000")
})
//estamos importando a função createserver do modulo http do node
const { createServer } = require('node:http')


const hostname = "127.0.0.1";

const port = 5000; // porta onde o servidor vair roda

//criando o servidor 
const server = createServer((req, res) => {
    res.statusCode = 200; // OK

    res.setHeader('Content-Type', 'text/plain');

    res.end("rodando")

})

//faz o servidor escutar na orta e no endereço definidos 
//quando o servidor iniciar executar essa sessão
server.listen(port, hostname, () => {
    console.log(`server running http://${hostname}:${port}/`);

})
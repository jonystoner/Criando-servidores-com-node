//importando protocolo http do node js. esse modulo já vem natido do node e permite criar servidores web
const http = require("http");

//criando servirdor
// creatersercver recebe a função que será executada toda vez que alguem     acessar o servidor 
const server = http.createServer((req,res) => {
    res.end("servidor on")

})

// porta onde vai ter minha resposta do servidor escolhida por nos 
server.listen(3000)
// Portas padrões
// 3000 => desenvolvimento 
// 5000 => comun para API
// 8080 => alternativa para web
// 80 => http padrão 
// 443 => https






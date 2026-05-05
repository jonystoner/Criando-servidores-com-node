const http = require('http')

const servidor = http.createServer((req,res) => {
    
    // buscando o tipo de metodo da requisição 
    console.log(req.method);
    //passando a resposta do servidor com status code = 200  tipo de resposta tetxo simples 
    res.writeHead(200, {'content-type':'text/plain'})
    //exibe na tela para o usuário ao consultar esse caminho 
    res.end("Servidor funcinando vai corinthians")
})

servidor.listen(3000, () => {
    console.log("o sevidor esta rodando na porta 3000")
    console.log("http://localhost:3000/")

})


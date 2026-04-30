
const http = require("http");


const server = http.createServer((req,res) => {

   if(req.url == "/") {
    res.end("pagina principal")
   }
   else if (req.url == "/sobre"){
    res.end("sobre o sistema")
   }
   else if (req.url == "/contato") {
     res.end("tudo certo com a rota contatos")
   }

   else{
    res.end("pagina não encontrada")
   }

})


server.listen(3000)

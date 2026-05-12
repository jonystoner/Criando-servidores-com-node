// fazendo o requerimento/importação dos modulos http e url do nodejs
const http = require('http');
const url = require('url');

//criação do servidor 
const servidor = http.createServer((req,res) => {
    //aqui estamos recebendo a URL e "quebrando"a mesmas e colocando como texto 
    //dados da url nessa const 

    const dadoUrlText = url.parse(req.url, true);
    // vai trazer os dados no console 
    //para fazer o query params para iniciar ? e para colocar mais de só colocar o & para icluir mais atributos nele 
    console.log(dadoUrlText)  
    res.end("veja o no cconsole")
})


servidor.listen("3000", () => {
     console.log("server on http://localhost:3000");
});


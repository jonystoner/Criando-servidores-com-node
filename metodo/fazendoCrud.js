const http = require('http');
const { json } = require('stream/consumers');

let livros = [
    {
        id: 1,
        titulo: "pequeno principe",
        autor: "antonie de saint -exupery"
    },
    {
        id: 2,
        titulo: "garry potter",
        autor: "antonie de saint -exupery"
    }

]

let filmes = [
    {
        id: 1,
        titulo: "titanic",
        autor: "antonie de saint -exupery"
    },
    {
        id: 2,
        titulo: "o poderoso chefão",
        autor: "antonie de saint -exupery"
    }

]

const servidor = http.createServer((req, res) => {
    // armazenando o metodo requerido
    const methhod = req.method;

    const url = req.url

    res.setHeader('content-type', 'application/json')

    //metodo get 

    if (url == "/livros" && methhod === 'GET') {
        res.statusCode = 200
        res.end(JSON.stringify(livros));
        return;
    }

    if (url == "/filmes" && methhod === 'GET') {
        res.statusCode = 200
        res.end(JSON.stringify(filmes));
        return;
    }

    //metodo post

    if (url === "/livros" && methhod === "POST") {
        let body = '';
        //.on sgfica que toda vez que essa requisição for feita inicia uma ação toda vez que ela é chamada
        // data é o inicio e o fim é o end 
        req.on('data', parte => {
            body += parte
        });

        req.on('end', () => {
            const novoLivro = JSON.parse(body);
            livros.push(novoLivro)

            res.statusCode = 201;

            res.end(JSON.stringify({
                mensagem: "livro cadastrado com sucesso",
                livro: novoLivro
            }));
        });

        return;


    }

})


servidor.listen(3000, () => {
    console.log("o servidor esta rodando na porta 3000 link para acesso http://localhost:3000/livros")

})
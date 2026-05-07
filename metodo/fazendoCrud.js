const http = require('http');


let livros = [
    {
        id: 1,
        descricao: "pequeno principe",
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
    // metodo put
    //
    if (url == "/livros" && methhod === 'PUT') {

        let body = '';
        //.on sgfica que toda vez que essa requisição for feita inicia uma ação toda vez que ela é chamada
        // data é o inicio e o fim é o end 
        req.on('data', parte => {
            body += parte
        });



        req.on('end', () => {
            const livroAtualizado = JSON.parse(body);

            livros = livros.map(livro => {
                if (livro.id === livroAtualizado.id) {
                    return livroAtualizado;
                }
                return livro
            })
            res.statusCode = 200; //sucesso


            res.end(JSON.stringify({
                mensagem: 'livro atualizado',
                livros: livros
            }))
        });
        return;
    }

    if (url === '/livros' && methhod === 'DELETE') {
        let body = '';
        //.on sgfica que toda vez que essa requisição for feita inicia uma ação toda vez que ela é chamada
        // data é o inicio e o fim é o end 
        req.on('data', parte => {
            body += parte
        });

        req.on('end', () => {
            const dados = JSON.parse(body);

            livros = livros.filter(livro => 
                livro.id !== dados.id 

            )
            console.log(livros)

            console.log(dados)

            res.statusCode = 200;

            res.end(JSON.stringify({
                mensagem: "livro deletado",
                livros: livros
            }))
        })
        return;
    };

    res.statusCode = 404;
    res.end(JSON.stringify({
        mensagem: "rota não encontrada"
    }))

})


servidor.listen(3000, () => {
    console.log("o servidor esta rodando na porta 3000 link para acesso http://localhost:3000/livros")

})

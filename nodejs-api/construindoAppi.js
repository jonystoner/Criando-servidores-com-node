// 1 passo criação do servidor
// 2 passo: exibir roga e metodo adquirido 
// 3 passo: Atribuir o metodo get
// 4 passo: atribuir o metodo post 
// 5 passo atribuir o metodo put 
// 6 passo atribuir o metodo delte 
// 7 
//importando o modulo http nativo do nodejs
const http = require('http')
// importando modulo url nativo do node.js
const url = require('url')

let pedidos = [{
    id: "1",
    nome: "jonathan",
    status: "ok"

}]



//criação do servidor 
const server = http.createServer((req, res) => {
    // define a resposta do servidor como uma palicação json
    res.setHeader("Content-Type", "application/JSON")
    //respota que será exibida para o usuário, convertida em json

    //leitura da url 
    const urlcompleta = url.parse(req.url, true)

    //Recebemos os dados da rota e metodo atraves da url 
    const rota = urlcompleta.pathname
    const method = req.method

    if (rota === "/pedidos" && method === "GET") {

        let body = ''

        req.on('data', parte => {
            body += parte
        })
        res.end(JSON.stringify({
            mensagem: "lista de pedidos",
            pedidos: pedidos
        }));
        return;
    };

    //criação do metodo post
    if (rota === "/pedidos" && method === "POST") {
        //variavel bosdy que ira armarzenar as partes do conteudo enviados pela requisoção 
        let body = ''
        //on = ação 
        // ao disparo da requisção =, a ação referente ao armazenamento das paster do body irá acontecer 
        req.on('data', parte => {
            body += parte // acumulo das partes da variavel body 
        })

        req.on('end', () => {
            //no disparo da função, após o armazenamento das partes no body damos inicio a ação final para o processamento da requisição 

            //armazena o conteudo do body traduzido para o objeto js
            const novoPedido = JSON.parse(body)

            //incluindo o novo pedido no array de pedidos 
            pedidos.push(novoPedido)

            res.statusCode = 201

            res.end(JSON.stringify({
                mensagem: "sucesso",
                pedidos: novoPedido
            }))
        })

        return;
    };


    //criação do metodo PUT
    if (rota === "/pedidos" && method === "PUT") {
        //variavel bosdy que ira armarzenar as partes do conteudo enviados pela requisoção 
        let body = ''
        //on = ação 
        // ao disparo da requisção =, a ação referente ao armazenamento das paster do body irá acontecer 
        req.on('data', parte => {
            body += parte // acumulo das partes da variavel body 
        })

        req.on('end', () => {
            //no disparo da função, após o armazenamento das partes no body damos inicio a ação final para o processamento da requisição 

            //armazena o conteudo do body traduzido para o objeto js
            const dados = JSON.parse(body)

            let encotrado = false;

            pedidos = pedidos.map(pedido => {
                //comparação do id para ser possivel substituir
                if (pedido.id === dados.id) {
                    encotrado = true // quando localizado vira true 
                    //retornara todos os daods do pedidos quye foram alterados + status de cada um deles 
                    return {
                        ...pedido,
                        status: dados.status
                    }
                }
                return pedido
            })
            if (!encotrado) {
                res.statusCode = 404
                res.end(JSON.stringify({ mensagem: "rota nãop encontrada " }));
                return;
            };
            res.end(JSON.stringify({
                mensagem: "Pedido atualizado",
                dados: pedidos
            }));
        });

        return;
    };
// Criação do método DELETE
    if(rota === "/pedidos" && method === "DELETE") {
        let body = ''; // variável que armazena os pedaços da requisição
        // ação que será disparada com a requisição para armazenar as partes da requisição dentro da variável body
        req.on('data', parte => {
            body += parte;
        });
 
        req.on('end', () => {
            // dados receberá o body traduzido para objeto em JavaScript
            const dados = JSON.parse(body);
 
            // Medirá o tamanho do array antes de o deletar-mos
            const tamanhoAntes = pedidos.length;
 
            // Manterá todos os pedidos que NÃO tem o id informado e removerá os que tem o ID igual ao enviado pela requisição.
            pedidos = pedidos.filter(pedido => pedido.id !== dados.id);
 
            // Fará a comparação de tamanho do array, se os tamanhos estiverem identidos, o pedido não foi localizado para que seja apagado.
            if(pedidos.length === tamanhoAntes) {
                res.statusCode = 404;
                res.end(JSON.stringify({ mensagem: "Pedido não encontrado"}));
                return;
            };
 
            // Reposta final que exibe o pedido removido com sucesso e exibe o array atualizado
            res.end(JSON.stringify({
                mensagem: "Pedido removido",
                dados: pedidos
            }));
        });
        return;
    };

    res.statusCode = 404

    res.end(JSON.stringify({
        mensagem: "pagina não encontada "
    }))
});
//definição da porta onde o servidor rodara 
server.listen(3000, () => {
    console.log("servidor online http://localhost:3000")
})
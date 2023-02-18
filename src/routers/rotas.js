const express = require('express')
const { cadastroUsuario } = require('../controllers/usuarios')

const rotas = express.Router()

rotas.post('/usuario', cadastroUsuario)// cadastrar usuario
rotas.post('/login',) // Login do usuário

//rotas.use('Colocar validacao do token aqui') // Validações do token

rotas.get('/usuario',) // Detalhar usuário
rotas.put('/usuario',) // Atualizar usuário
rotas.get('/categoria',) // Listar categorias
rotas.get('/transacao',) // Listar transações do usuário logado
rotas.get('/tansacao/:id',) // Detalhar uma transação do usuário logado
rotas.post('/transacao',) // Cadastrar transação para o usuário logado
rotas.put('/transacao/:id',) // Atualizar transação do usuário logado
rotas.delete('/transacao/:id',) // Excluir transação do usuário logado
rotas.get('/transacao/extrato',) // Obter extrato de transações


module.exports = rotas

/*

EXTRA!!!

ATENÇÃO!: Esta parte extra não é obrigatória e recomendamos que seja feita apenas quando terminar toda a parte obrigatória acima.

Filtrar transações por categoria

Na funcionalidade de listagem de transações do usuário logado (GET /transacao), deveremos incluir um parâmetro do tipo query filtro para que seja possível consultar apenas transações das categorias informadas.

Lembre-se: Deverão ser retornadas apenas transações associadas ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

Requisição
Parâmetro opcional do tipo query filtro. Não deverá possuir conteúdo no corpo (body) da requisição.

Resposta
Em caso de sucesso, o corpo (body) da resposta deverá possuir um array dos objetos (transações) encontradas.
Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.

REQUISITOS OBRIGATÓRIOS

O usuário deverá ser identificado através do ID presente no token de validação
O parâmetro opcional do tipo query filtro, quando enviado, deverá ser sempre um array contendo a descrição de uma ou mais categorias.
O endpoint deverá responder com um array de todas as transações associadas ao usuário que sejam da categorias passadas no parâmetro query. Caso não exista nenhuma transação associada ao usuário deverá responder com array vazio.

*/

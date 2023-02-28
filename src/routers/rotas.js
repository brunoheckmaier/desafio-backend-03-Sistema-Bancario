const express = require('express')

const { validaDadosUsuario, verificaEmailExistente, validaEmailSenha, confereSeEmailEstaCerto, confereSeSenhaEstaCerto, validarDescricao, validarValor, validarData, validarCategoria, validarTipo } = require('../middleware/validacoes')

const { cadastroUsuario, loginUsuario, detalharUsuario, atualizarUsuario } = require('../controllers/usuarios')

const { listarCategorias } = require('../controllers/categorias')

const { validarToken } = require('../middleware/autenticacao')
const { listarTransacoes, detalharTransacao, cadastrarTransacao, editarTransacao } = require('../controllers/transacoes')
const rotas = express.Router()

rotas.post('/usuario', validaDadosUsuario, verificaEmailExistente, cadastroUsuario)// cadastrar usuario
rotas.post('/login', validaEmailSenha, confereSeEmailEstaCerto, confereSeSenhaEstaCerto, loginUsuario) // Login do usuário

rotas.use(validarToken) // Validações do token

rotas.get('/usuario', detalharUsuario) // Detalhar usuário
rotas.put('/usuario', validaDadosUsuario, verificaEmailExistente, atualizarUsuario) // Atualizar usuário
rotas.get('/categoria', listarCategorias) // Listar categorias
rotas.get('/transacao', listarTransacoes) // Listar transações do usuário logado
rotas.get('/transacao/:idTransacao', detalharTransacao) // Detalhar uma transação do usuário logado
rotas.post('/transacao', validarDescricao, validarValor, validarData, validarCategoria, validarTipo, cadastrarTransacao) // Cadastrar transação para o usuário logado
rotas.put('/transacao/:id', validarDescricao, validarValor, validarData, validarCategoria, validarTipo, editarTransacao) // Atualizar transação do usuário logado
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

const mysql = require ('mysql');


const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'admin',
    database: 'cadastro-teste'
})

module.exports = conexao;
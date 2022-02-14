const conexao = require('./connections/conexao')
const tabelas = require('./connections/tabelas')
const routesRouter =require ("./controllers/cadastro.js");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
conexao.connect(erro =>{
    if(erro){
        console.log("erro ao conectar db!")
    }else{
        console.log("db conectado!")
        tabelas.init(conexao);
        const app = express();
        app.use('/cadastro/js',express.static( __dirname + '/js'));
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use("/cadastro",routesRouter);
        app.use(cors());




        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
  })
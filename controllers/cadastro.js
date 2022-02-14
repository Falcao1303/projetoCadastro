const express = require('express');
const routes = express.Router();
const data = require('../models/data')
const appRoot = require('app-root-path')


// Rotas para as views
 routes.get('/home',(req,res)=>{
    res.sendFile(appRoot + "/home.html")
 })

 routes.get('/ficha',(req,res)=>{
    res.sendFile(appRoot + "/cadastro.html")
 })

 routes.get('/lista',(req,res)=>{
    res.sendFile(appRoot + "/lista.html")
 })


// Rotas para o model
routes.get('/usuarios/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    data.buscaPorId(id,res);
  })

  routes.get('/usuarios/verificar/:usuario',(req,res)=>{
   const usuario = req.params.usuario;
   data.verificaUsuario(usuario,res);
 })


 routes.get('/usuarios/verificar/:usuario/:password',(req,res)=>{
   const usuario = {'usuario' :req.params.usuario,
                    'senha' : req.params.password };
                    console.log(usuario);
   data.verificaSenha(usuario,res);
 })
 
 routes.post('/usuarios/editar/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body

    data.altera(id, valores, res)
})

routes.post('/usuarios/deleta/:id', (req, res) => {
    const id = parseInt(req.params.id)

    data.deleta(id, res)
})

routes.post('/usuarios/salvar', function (req, res) {

    const user = req.body.params;
    data.salvar(user,res);
});

routes.get('/usuarios',(req,res)=>{
    data.lista(res);
 })

module.exports = routes;
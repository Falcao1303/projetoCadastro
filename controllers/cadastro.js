const express = require('express');
const routes = express.Router();
const data = require('../models/data')




routes.post('/usuarios/salvar', function (req, res) {
    const user = req.body;
    data.salvar(user,res);
});

routes.get('/usuarios',(req,res)=>{
    data.lista(res);
 })

routes.get('/usuarios/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    data.buscaPorId(id,res);
  })
 
 routes.patch('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body

    data.altera(id, valores, res)
})

routes.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id)

    data.deleta(id, res)
})

module.exports = routes;
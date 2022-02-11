const conexao = require('../connections/conexao')

    class Usuario {
        salvar(usuario, res) {

            const usuarioValido = usuario.nome.length >=3
    
            const validacoes = [
                {
                    nome: 'nome',
                    valido: usuarioValido,
                    mensagem: 'Usuario deve ter pelo menos cinco caracteres'
                }
            ]
    
            const erros = validacoes.filter(campo => !campo.valido)
            const existemErros = erros.length
    
            if(existemErros) {
                res.status(400).json(erros)
            } else {        
                const cadastros = {...usuario}
    
                const sql = 'INSERT INTO usuarios SET ?'
    
                conexao.query(sql, cadastros, (erro, resultados) => {
                    if(erro) {
                        res.status(400).json(erro)
                    } else {
                        res.status(201).json(resultados)
                    }
                })
            }
        }
    

        lista(res){
            const sql = 'SELECT * FROM usuarios'

            conexao.query(sql,(erro,resultados)=>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(resultados)
                }
            })
        }

        buscaPorId(id,res){
            const sql = `SELECT * FROM atendimentos where id = ${id}`
            conexao.query(sql,(erro,resultados)=>{
                const atendimento = resultados[0];
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(atendimento)
                }
            })
        }

        altera(id, valores, res) {
            const sql = 'UPDATE usuarios SET ? WHERE id=?'
    
            conexao.query(sql, [valores, id], (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json({...valores, id})
                }
            }) 
        }

        deleta(id, res) {
            const sql = 'DELETE FROM usuarios WHERE id=?'
    
            conexao.query(sql, id, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json({id})
                }
            })
        }
}


module.exports = new Usuario
class Tabelas{
    init(conexao){
        this.conexao = conexao;
        this.criarCadastros();
    }
    criarCadastros(){
    const sql =  'CREATE TABLE IF NOT EXISTS Usuarios(id serial not null, usuario varchar(50) not null,cpf bigint(11) not null,nome varchar(20) not null, email varchar(30) not null, senha varchar(15) not null, PRIMARY KEY(id))';

        this.conexao.query(sql,(erro)=>{
            if(erro){
                console.log(erro);
            }else(
                console.log("Tabela usuario criado com sucesso!")
            )
        })
    }
}

module.exports = new Tabelas;
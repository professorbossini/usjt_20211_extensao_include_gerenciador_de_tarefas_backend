const mysql = require('mysql2');
const obterConexao = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
}

const listar = (callback) => {
  const conexao = obterConexao();
  conexao.query(
    'SELECT * FROM tb_tarefa',
    (erro, resultado) => {
      console.log(`resultado: ${resultado}`)
      callback(resultado)
    }
  );
}

const inserir = (tarefa, callback) => {
  const conexao = obterConexao();
  conexao.execute(
    'INSERT INTO tb_tarefa (descricao, finalizada) VALUES (?, ?)',
    [tarefa.descricao, tarefa.finalizada],
    (erro, resultado) => {
      callback(resultado);
    }
  );
}

const atualizar = (tarefa, callback) => {
  const conexao = obterConexao();
  conexao.execute(
    'UPDATE tb_tarefa SET finalizada = ? WHERE id = ?',
    [tarefa.finalizada, tarefa.id],
    (erro, resultado) => {
      callback(resultado);
    }
  );
}

module.exports = {
  listar, inserir, atualizar
}


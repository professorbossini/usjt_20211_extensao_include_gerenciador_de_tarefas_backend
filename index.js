require('dotenv').config();
const cors = require('cors');
const db = require ('./db');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

const obterTarefas = (req, res) => {
  db.listar ((tarefas) => {
    tarefas = tarefas.map((t) => {
      return {id: t.id, descricao: t.descricao, finalizada: t.finalizada === 1 ? true : false}
    })
    res.json({tarefas})
  })
};

let id = 3;

const tarefas = [
  {
    id: 1,
    descricao: "Dar aula",
    finalizada: false
  },
  {
    id: 2,
    descricao: "Ir ao mercado",
    finalizada: false
  }
];

//http://localhost:3000/tarefas (GET)
app.get("/tarefas", (req, res) =>{
  obterTarefas(req, res);
  //res.json({tarefas});
})
//http://localhost:3000/tarefas (POST)
app.post("/tarefas", (req, res) =>{
  const t = req.body;
  db.inserir(t, (resultado) => {
    obterTarefas(req, res);
  })
  // tarefas.push({id: id, descricao: t.descricao, finalizada: t.finalizada});
  // id++;
  // res.json({tarefas});
})

app.put('/tarefas', (req, res) => {
  db.atualizar(req.body, (resultado) => {
    obterTarefas(req, res);
  })
  // const index = tarefas.findIndex(t => t.id === req.body.id);
  // tarefas[index] = {...req.body};
  // res.json({tarefas});
})




app.listen (process.env.PORT, () => console.log("up and running"));

const tarefas = require('../models/tarefas') // apontamento do model Tarefas

const getAll = (req, res) => {
  console.log(req.url);
  tarefas.find(function(err, tarefas){
    if (err) {
      res.status(500).send({message: err.message})
    }
    res.status(200).send(tarefas);
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  // Find sempre retorna uma lista
  // FindOne retorna um unico documento
  tarefas.find({ id }, function(err, tarefas){
    //  tarefas.find({ idade: 17, corFavorita: "roxo", gostaCafe: false }, function(err, tarefas){
    if (err) {
      res.status(500).send({message: err.message})
    }
    res.status(200).send(tarefas);
  })
};

const postTarefa = (req, res) => {
  console.log(req.body);

  let tarefa = new tarefas(req.body);
  tarefa.save(function(err){
    if (err) {
      res.status(500).send({message: err.message})
    }
    res.status(201).send(tarefa.toJSON());
    })
};

const deleteTarefa = (req, res) => {
  const id = req.params.id;
  // deleteMany
  // deleteOne
  tarefas.find({ id }, function(err, tarefa){
    if(tarefa.length > 0){
      tarefas.deleteMany({ id }, function(err){
        if (err) {
          res.status(500).send({ 
            message: err.message,
            status: "FAIL" 
          })
        }
        res.status(200).send({ 
          message: "Registro removido com sucesso!",
          status: "SUCCESS"
        })
      })
    } else {
      res.status(200).send({ 
        message: "Não há tarefa para ser removida!",
        status: "EMPTY"
      })
    }
  }) 
};

const deleteTarefaConcluida = (req, res) => {
  // Deleta quando concluido = true
  try {
    tarefas.deleteMany({ concluido: true}, function (err){
      if (!err) {
        res.status(200).send({ 
          message: "Tarefas concluidas removidas com sucesso",
          status: "SUCCESS"
        })
      }
    })
  } catch (err){
    console.log(err)
    return res.status(424).send({message: err.message})
  }
}

const putTarefa = (req, res) => {
  const id = req.params.id

  // faz o update apenas do id passado como parametro
  // set são os valores atualizados
  // Update Many e UpdateOne
  tarefas.updateOne({ id }, { $set : req.body}, function (err){
    if (err) {
      res.status(500).send({message: err.message})
    }
    res.status(200).send({message: "Registro alterado com sucesso"})
  })
}

module.exports = {
  getAll,
  getById,
  postTarefa,
  deleteTarefa,
  deleteTarefaConcluida,
  putTarefa
};

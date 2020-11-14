const mongoose = require('mongoose');

// esqueleto do model (atributos da entidade)
const tarefasSchema = new mongoose.Schema({
    id: {type: Number},
    descricao: {type: String},
    dataInclusao: {type: String},
    concluido: {type: Boolean},
    nomeColaboradora: {type: String}
},{
    // gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

// atribuindo o esquema a uma collection
// definindo o nome da collection que irei salvar no banco
const tarefas = mongoose.model('collectionTarefas', tarefasSchema);

// exportar o model para ser utilizado
module.exports = tarefas;
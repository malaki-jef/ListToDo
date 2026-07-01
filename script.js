const tarefas = [];
let ultimoId = 0;

function criarTarefa(texto) { 
  const novaTarefa = {
    id: ++ultimoId,
    titulo: texto,
    status: false,
  };
  return novaTarefa;
}; // retorna novaTarefa para quando a função criarTarefa for chamada.


function adicionarTarefa(tarefa) { // função que adiciona a tarefa criada ao array tarefas
  tarefas.push(tarefa);
}; 


function buscarTarefaPorId(id) {
    return tarefas.find(tarefa => tarefa.id === id);
}; // função que busca a tarefa pelo id


function toggleTarefa(id) {
  const tarefa = buscarTarefaPorId(id);
  if(!tarefa) return;
  tarefa.status = !tarefa.status;
}; // função que alterna o status da tarefa encontrada


function editarTarefa(id, novoTitulo) {
  const tarefa = buscarTarefaPorId(id)
  if(!tarefa) return;
  const tituloLimpo = novoTitulo.trim()
  if(tituloLimpo === '') return;
  tarefa.titulo = tituloLimpo
}; // função que edita o titulo da tarefa encontrada

  function renderizarTarefas() {
    const container = document.querySelector('#todo');
    const stringsHTML = tarefas.map(function(tarefa) {
      const tituloTela = `<div data-id="${tarefa.id}"> ${tarefa.titulo}</div>`
      return tituloTela.join("");
    })
  }
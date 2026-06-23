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
const tarefa = criarTarefa('Tarefa 1'); // cria uma tarefa com o texto 'Tarefa 1', mas principalmente traz o valor da função criarTarefa para a variável tarefa.

function adicionarTarefa(tarefa) { // função que adiciona a tarefa criada ao array tarefas
  tarefas.push(tarefa);
}; 

adicionarTarefa(tarefa); // adiciona a tarefa criada ao array tarefas

function buscarTarefaPorId(id) {
  return tarefas.find(tarefa => tarefa.id === id);
}; // função que busca a tarefa pelo id

const tarefaEncontrada = buscarTarefaPorId(1); // busca a tarefa pelo id 1

function toggleTarefa(id) {
  const tarefa = buscarTarefaPorId(id);
  if(!tarefa) return;
  tarefa.status = !tarefa.status;
}; // função que alterna o status da tarefa encontrada

toggleTarefa(1); // chama a função toggleTarefa com o id 1 para alternar o status da tarefa encontrada

function editarTarefa(id, novoTitulo) {
  const tarefa = buscarTarefaPorId(id)
  if(!tarefa) return;
  const tituloLimpo = novoTitulo.trim()
  if(tituloLimpo === '') return;
  tarefa.titulo = tituloLimpo
}; // função que edita o titulo da tarefa encontrada

editarTarefa(1, 'Tarefa 2'); // chama a função editarTarefa com o id 1 e o novo titulo 'Tarefa 2' para editar o titulo da tarefa encontrada

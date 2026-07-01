// VARIÁVEIS DE DADOS
const tarefas = [];
let ultimoId = 0;
let editando = null;

// VARIAVEIS DE DOM ELEMENTOS
const formEditar = document.querySelector('#formEdit');
formEditar.classList.add('hide');


// FUNÇÕES
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


  renderizarTarefas();
}; 


function buscarTarefaPorId(id) {
    return tarefas.find(tarefa => tarefa.id === id);
}; // função que busca a tarefa pelo id


function toggleTarefa(id) {
  const tarefa = buscarTarefaPorId(id);
  if(!tarefa) return;
  tarefa.status = !tarefa.status;

  renderizarTarefas();
}; // função que alterna o status da tarefa encontrada


function editarTarefa(id, novoTitulo) {
  const tarefa = buscarTarefaPorId(id)
  if(!tarefa) return;
  const tituloLimpo = novoTitulo.trim()
  if(tituloLimpo === '') return;
  tarefa.titulo = tituloLimpo

  renderizarTarefas();
};

function renderizarTarefas() {
  const container = document.querySelector('#todo');
  const stringsHTML = tarefas.map(function(tarefa) {
    const tituloTela = `<div class="todoList ${tarefa.status ? 'check' : ' ' }" data-id="${tarefa.id}"><h4>${tarefa.titulo}</h4>
    <button class="btnCheck" data-id="${tarefa.id}"><i class="fa-solid fa-check"></i></button>
    <button class="btnEditar" data-id="${tarefa.id}"><i class="fa-regular fa-pen-to-square"></i></button>
    <button class="btnExcluir" data-id="${tarefa.id}"><i class="fa-regular fa-rectangle-xmark"></i></button>
    </div>`;
    return tituloTela;
  }) 
  container.innerHTML = stringsHTML.join("");
}

// EVENTOS

const formInput = document.querySelector('#formInput');

formInput.addEventListener('submit', function(event) {
  event.preventDefault();
  const input = document.querySelector('.inputForm'); //Primeiro capturamos o input
  const texto = input.value.trim(); //Depois capturamos o valor do input
  if(texto === '') return; //Se o valor do input for vazio, a função retorna e não faz nada
  const novaTarefa = criarTarefa(texto);
  adicionarTarefa(novaTarefa);
  input.value = '';
  input.focus();
});                                           

const todo = document.querySelector('#todo');

todo.addEventListener('click', function(event) {
  const target = event.target;

  if(target.classList.contains('btnCheck')) {
    toggleTarefa(Number(target.dataset.id));
  }
  if(target.classList.contains('btnEditar')) {
    const inputEditar = document.querySelector('.inputEdit');
    editando = Number(target.dataset.id);
    formEditar.classList.remove('hide');
    inputEditar.focus();
  }
  if(target.classList.contains('btnExcluir')) {
    excluirTarefa(Number(target.dataset.id));
  }
}); 

formEditar.addEventListener('submit', function(e){
  e.preventDefault()
  const edit = document.querySelector('.inputEdit');
  const editTexto = edit.value.trim();
  if(editTexto === "") return;

  editarTarefa(editando,editTexto)
  formEditar.classList.add('hide');
  edit.value = "";
});
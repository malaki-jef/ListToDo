// Seleção de dados
const cointainer = document.querySelector('#container');
const formInput = document.querySelector('#formInput');
const formEdit = document.querySelector('#formEdit');
const formPesquisa = document.querySelector('#formPesquisa');
const inputForm = document.querySelector('.inputForm');
const inputEdit = document.querySelector('.inputEdit');
const containerPesquisa = document.querySelector('#containerPesquisa');
const menu = document.querySelector('#menu');
const cancelBtn = document.querySelector('.cancel-btn');
const inputPesquisa = document.querySelector('.inputPesquisa');
let tituloAntigo;

// Função
const criarElemento = (text) => {
  const todoList = document.querySelector('#todo');

  const div = document.createElement('div');
  div.classList.add('todoList');
  todoList.appendChild(div);

  const title = document.createElement('h4');
  title.textContent = text;
  title.classList.add('titleList');
  div.appendChild(title);

  const btnDone = document.createElement('button');
  btnDone.innerHTML = "<i class='fa-solid fa-check'>";
  btnDone.classList.add('btnDone');
  div.appendChild(btnDone);

  const btnEdit = document.createElement('button');
  btnEdit.innerHTML = "<i class='fa-solid fa-pen'>";
  btnEdit.classList.add('btnEdit');
  div.appendChild(btnEdit);

  const btnRemove = document.createElement('button');
  btnRemove.innerHTML = "<i class='fa-solid fa-xmark'>";
  btnRemove.classList.add('btnRemove');
  div.appendChild(btnRemove);
};

const escondeTudo = () => {
  formInput.classList.toggle('hide');
  containerPesquisa.classList.toggle('hide');
};

const editarTarefa = (editTaref) => {
  const todos = document.querySelectorAll('.todoList');

  todos.forEach((todo) => {
    let todosTitulos = todo.querySelector('h4');

    if (todosTitulos.innerText === tituloAntigo) {
      todosTitulos.innerText = editTaref;
    }

    inputEdit.value = '';
  });
};

function mostrarAlert() {
  document.getElementById('alerta').style.display = 'block';
}

function fecharAlert() {
  document.getElementById('alerta').style.display = 'none';
}

function criarAlerta() {
  const divForm = document.querySelector('.divInput')
  const alerta = document.createElement('div');
  alerta.classList.add('alerta');
  alerta.innerText = 'Tarefa adicionada com sucesso!';
  divForm.appendChild(alerta); //tentar colocar alerta
}
// Evento

formInput.addEventListener('submit', (e) => {
  e.preventDefault();

  const valueInput = inputForm.value;

  if (valueInput) {
    criarElemento(valueInput);
  } else {
    criarAlerta()
    mostrarAlert()
  };

  inputForm.value = '';
  inputForm.focus();
});

document.addEventListener('click', (event) => {
  const targeEl = event.target;
  const parentEl = targeEl.closest('.todoList');
  let tituloEditar;

  if (parentEl && parentEl.querySelector('h4')) {
    tituloEditar = parentEl.querySelector('h4').innerText;
  }

  if (targeEl.classList.contains('btnDone')) {
    parentEl.classList.toggle('check');
    console.log(targeEl);
  }

  if (targeEl.classList.contains('btnRemove')) {
    parentEl.remove();
  }
  if (targeEl.classList.contains('btnEdit')) {
    escondeTudo();

    inputEdit.value = tituloEditar; // jogo para o input de editar o valor do h4 que foi criado na tarefa.
    tituloAntigo = tituloEditar; // armazenou o valor da tarega h4 em uma variavel.
  }
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();

  inputEdit.value = '';

  escondeTudo();
});

formEdit.addEventListener('submit', (e) => {
  e.preventDefault();

  const editTaref = inputEdit.value;

  if (editTaref) {
    editarTarefa(editTaref);
  }

  escondeTudo();

});

inputPesquisa.addEventListener('input', (e) => {
 
  const todos = document.querySelectorAll('.todoList');
  const valorInputPesquisa = inputPesquisa.value.toLowerCase();

  todos.forEach((text) => {
    const textoH4 = text.textContent.toLowerCase();

    if (textoH4.includes(valorInputPesquisa)) {
      text.style.display = '';
    } else {
      text.style.display = 'none';
    }
  });
});


menu.addEventListener('change', () => {
  const valor = menu.value; 

  const todos = document.querySelectorAll('.todolist'); 

  todos.forEach((item) => {

    const status = item.classList.contains('check') ? 'feitos' : 'pendentes';
    
    if (valor === 'todos') {
      item.style.display = 'flex';
    } else if (valor === status) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
});



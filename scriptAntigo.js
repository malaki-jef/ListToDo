// Seleção de dados
const container = document.querySelector('#container');
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

// =========================
// Funções
// =========================

const criarElemento = (text) => {
  const todo = document.querySelector('#todo');

  const div = document.createElement('div');
  div.classList.add('todoList');
  todo.appendChild(div);

  const title = document.createElement('h4');
  title.textContent = text;
  title.classList.add('titleList');
  div.appendChild(title);

  const btnDone = document.createElement('button');
  btnDone.classList.add('btnDone');
  btnDone.innerHTML = "<i class='fa-solid fa-check'></i>";
  div.appendChild(btnDone);

  const btnEdit = document.createElement('button');
  btnEdit.classList.add('btnEdit');
  btnEdit.innerHTML = "<i class='fa-solid fa-pen'></i>";
  div.appendChild(btnEdit);

  const btnRemove = document.createElement('button');
  btnRemove.classList.add('btnRemove');
  btnRemove.innerHTML = "<i class='fa-solid fa-xmark'></i>";
  div.appendChild(btnRemove);
};

const escondeTudo = () => {
  formInput.classList.toggle('hide');
  formEdit.classList.toggle('hide');
  containerPesquisa.classList.toggle('hide');
};

const editarTarefa = (editTaref) => {
  const todos = document.querySelectorAll('.todoList');

  todos.forEach((todo) => {
    const titulo = todo.querySelector('h4');

    if (titulo.innerText === tituloAntigo) {
      titulo.innerText = editTaref;
    }
  });

  inputEdit.value = '';
};

function mostrarAlert() {
  const alerta = document.querySelector('.alerta');

  if (alerta) {
    alerta.style.display = 'block';
  }
}

function fecharAlert() {
  const alerta = document.querySelector('.alerta');

  if (alerta) {
    alerta.style.display = 'none';
  }
}

function criarAlerta() {
  if (document.querySelector('.alerta')) return;

  const divForm = document.querySelector('.divInput');

  const alerta = document.createElement('div');
  alerta.classList.add('alerta');
  alerta.innerText = 'Digite uma tarefa antes de adicionar.';
  alerta.style.display = 'none';

  divForm.appendChild(alerta);
}

// cria apenas uma vez
criarAlerta();

// =========================
// Eventos
// =========================

formInput.addEventListener('submit', (e) => {
  e.preventDefault();

  const valueInput = inputForm.value.trim();

  if (valueInput) {
    criarElemento(valueInput);
    fecharAlert();
  } else {
    mostrarAlert();
    return;
  }

  inputForm.value = '';
  inputForm.focus();
});

document.addEventListener('click', (event) => {

  const btnDone = event.target.closest('.btnDone');
  const btnEdit = event.target.closest('.btnEdit');
  const btnRemove = event.target.closest('.btnRemove');

  const parentEl = event.target.closest('.todoList');

  if (!parentEl) return;

  const tituloEditar = parentEl.querySelector('h4').innerText;

  if (btnDone) {
    parentEl.classList.toggle('check');
  }

  if (btnRemove) {
    parentEl.remove();
  }

  if (btnEdit) {
    escondeTudo();

    inputEdit.value = tituloEditar;
    tituloAntigo = tituloEditar;
  }

});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();

  inputEdit.value = '';

  escondeTudo();
});

formEdit.addEventListener('submit', (e) => {
  e.preventDefault();

  const editTaref = inputEdit.value.trim();

  if (editTaref) {
    editarTarefa(editTaref);
  }

  escondeTudo();
});

inputPesquisa.addEventListener('input', () => {

  const valorPesquisa = inputPesquisa.value.toLowerCase();

  const todos = document.querySelectorAll('.todoList');

  todos.forEach((item) => {

    const texto = item.querySelector('h4').textContent.toLowerCase();

    if (texto.includes(valorPesquisa)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }

  });

});

menu.addEventListener('change', () => {

  const valor = menu.value;

  const todos = document.querySelectorAll('.todoList');

  todos.forEach((item) => {

    const status = item.classList.contains('check')
      ? 'feitos'
      : 'pendentes';

    if (valor === 'todos') {
      item.style.display = 'flex';
    } else if (valor === status) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }

  });

});
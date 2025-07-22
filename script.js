const tarefas = [];
let contadorId = 0;

//  Adiciona nova tarefa
document.getElementById('formTarefa').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nomeTarefa').value.trim();
  const prioridade = document.getElementById('prioridade').value;

  if (nome !== '') {
    const novaTarefa = {
      id: contadorId++,
      nome,
      prioridade,
      concluida: false
    };

    tarefas.push(novaTarefa);
    renderizarTarefas();
    this.reset();
  }
});

// Renderiza a lista de tarefas
function renderizarTarefas() {
  const lista = document.getElementById('listaTarefas');
  lista.innerHTML = '';

  // 🔼 Ordenar por prioridade: alta > média > baixa
  const ordemPrioridade = { alta: 1, media: 2, baixa: 3 };
  const tarefasOrdenadas = [...tarefas].sort((a, b) => {
    return ordemPrioridade[a.prioridade] - ordemPrioridade[b.prioridade];
  });

  tarefasOrdenadas.forEach(tarefa => {
    const li = document.createElement('li');
    li.classList.add(tarefa.prioridade);
    if (tarefa.concluida) li.classList.add('concluida');

    li.innerHTML = `
      <span>${tarefa.nome}</span>
      <div>
        <button onclick="concluirTarefa(${tarefa.id})" title="Concluir">
          <img src="img/verificar.png" alt="Concluir" width="20" />
        </button>
        <button onclick="removerTarefa(${tarefa.id})" title="Remover">
          <img src="img/lixo.png" alt="Remover" width="20" />
        </button>
      </div>
    `;

    lista.appendChild(li);
  });
}

//  Marcar ou desmarcar tarefa como concluída
function concluirTarefa(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    renderizarTarefas();
  }
}

//  Remover tarefa individual
function removerTarefa(id) {
  const index = tarefas.findIndex(t => t.id === id);
  if (index > -1) {
    tarefas.splice(index, 1);
    renderizarTarefas();
  }
}

//  Botão para apagar toda a lista
document.getElementById('limparLista').addEventListener('click', function () {
  if (confirm('Tem certeza que deseja apagar todas as tarefas?')) {
    tarefas.length = 0;
    renderizarTarefas();
  }
});

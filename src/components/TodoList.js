import { useState } from "react";

function TodoList() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");

  function adicionar(evento) {
    evento.preventDefault();
    if (texto.trim() === "") return;

    const nova = { id: Date.now(), titulo: texto.trim(), feita: false };
    setTarefas([...tarefas, nova]);
    setTexto("");
  }

  function alternar(id) {
    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, feita: !t.feita } : t))
    );
  }

  function remover(id) {
    setTarefas(tarefas.filter((t) => t.id !== id));
  }

  return (
    <div className="todo">
      <h2>To-Do List</h2>

      <form onSubmit={adicionar} className="todo-form">
        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {tarefas.length === 0 ? (
        <p className="vazio">Nenhuma tarefa ainda.</p>
      ) : (
        <ul className="todo-lista">
          {tarefas.map((t) => (
            <li key={t.id}>
              <span
                className={t.feita ? "feita" : ""}
                onClick={() => alternar(t.id)}
              >
                {t.titulo}
              </span>
              <button className="secundario" onClick={() => remover(t.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
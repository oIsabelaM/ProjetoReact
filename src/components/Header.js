const itens = [
  "To-Do List",
  "Contador de Cliques",
  "Jogo da Velha",
  "Calculadora",
  "Buscador de CEP",
];

function Header({ paginaAtual, aoTrocar }) {
  return (
    <header className="header">
      <h1>🌸 Projeto React 🌸</h1>
      <nav>
        {itens.map((item) => (
          <button
            key={item}
            className={item === paginaAtual ? "ativo" : ""}
            onClick={() => aoTrocar(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
import { useState } from "react";

function Contador() {
  const [cliques, setCliques] = useState(0);

  return (
    <div className="contador">
      <h2>Contador de Cliques</h2>
      <p className="numero">{cliques}</p>
      <div className="botoes">
        <button onClick={() => setCliques(cliques + 1)}>Clicar</button>
        <button className="secundario" onClick={() => setCliques(0)}>
          Zerar
        </button>
      </div>
    </div>
  );
}

export default Contador;
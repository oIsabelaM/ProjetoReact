import { useState } from "react";

const LINHAS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function verificarVencedor(casas) {
  for (const [a, b, c] of LINHAS) {
    if (casas[a] && casas[a] === casas[b] && casas[a] === casas[c]) {
      return { jogador: casas[a], linha: [a, b, c] };
    }
  }
  return null;
}

function JogoDaVelha() {
  const [casas, setCasas] = useState(Array(9).fill(null));
  const [xEhProximo, setXEhProximo] = useState(true);

  const resultado = verificarVencedor(casas);
  const empate = !resultado && casas.every((c) => c !== null);

  function jogar(i) {
    if (casas[i] || resultado) return;

    const novas = [...casas];
    novas[i] = xEhProximo ? "X" : "O";
    setCasas(novas);
    setXEhProximo(!xEhProximo);
  }

  function reiniciar() {
    setCasas(Array(9).fill(null));
    setXEhProximo(true);
  }

  let status;
  if (resultado) {
    status = `Vencedor: ${resultado.jogador} 🎉`;
  } else if (empate) {
    status = "Deu velha! 🌸";
  } else {
    status = `Vez de: ${xEhProximo ? "X" : "O"}`;
  }

  return (
    <div className="velha">
      <h2>Jogo da Velha</h2>
      <p className="status">{status}</p>

      <div className="tabuleiro">
        {casas.map((valor, i) => {
          const vitoria = resultado && resultado.linha.includes(i);
          const classe = `casa ${valor ? valor.toLowerCase() : ""} ${
            vitoria ? "vitoria" : ""
          }`;
          return (
            <button key={i} className={classe} onClick={() => jogar(i)}>
              {valor}
            </button>
          );
        })}
      </div>

      <button className="reiniciar" onClick={reiniciar}>
        Reiniciar
      </button>
    </div>
  );
}

export default JogoDaVelha;
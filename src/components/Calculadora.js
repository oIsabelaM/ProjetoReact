import { useState } from "react";

function Calculadora() {
  const [visor, setVisor] = useState("0");
  const [anterior, setAnterior] = useState(null);
  const [operacao, setOperacao] = useState(null);
  const [novoNumero, setNovoNumero] = useState(true);

  function calcular(a, b, op) {
    let r = 0;
    if (op === "+") r = a + b;
    if (op === "−") r = a - b;
    if (op === "×") r = a * b;
    if (op === "÷") {
      if (b === 0) return "Erro";
      r = a / b;
    }
    return String(Number(r.toFixed(10)));
  }

  function digitar(d) {
    if (novoNumero) {
      setVisor(d);
      setNovoNumero(false);
    } else {
      setVisor(visor === "0" ? d : visor + d);
    }
  }

  function ponto() {
    if (novoNumero) {
      setVisor("0.");
      setNovoNumero(false);
    } else if (!visor.includes(".")) {
      setVisor(visor + ".");
    }
  }

  function escolherOperacao(op) {
    if (visor === "Erro") return;
    const atual = parseFloat(visor);

    if (anterior !== null && operacao && !novoNumero) {
      const r = calcular(anterior, atual, operacao);
      setVisor(r);
      if (r === "Erro") {
        setAnterior(null);
        setOperacao(null);
        setNovoNumero(true);
        return;
      }
      setAnterior(parseFloat(r));
    } else {
      setAnterior(atual);
    }
    setOperacao(op);
    setNovoNumero(true);
  }

  function igual() {
    if (anterior === null || !operacao || visor === "Erro") return;
    const r = calcular(anterior, parseFloat(visor), operacao);
    setVisor(r);
    setAnterior(null);
    setOperacao(null);
    setNovoNumero(true);
  }

  function limpar() {
    setVisor("0");
    setAnterior(null);
    setOperacao(null);
    setNovoNumero(true);
  }

  const linhas = [
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
  ];

  return (
    <div className="calculadora">
      <h2>Calculadora</h2>

      <div className="calc-visor">
        <div className="historico">
          {anterior !== null ? `${anterior} ${operacao}` : "\u00A0"}
        </div>
        <div className="valor">{visor}</div>
      </div>

      <div className="teclado">
        <button className="secundario largo" onClick={limpar}>
          C
        </button>
        <button className="secundario" onClick={() => escolherOperacao("÷")}>
          ÷
        </button>

        {linhas.flat().map((tecla) =>
          isNaN(tecla) ? (
            <button
              key={tecla}
              className="secundario"
              onClick={() => escolherOperacao(tecla)}
            >
              {tecla}
            </button>
          ) : (
            <button key={tecla} className="num" onClick={() => digitar(tecla)}>
              {tecla}
            </button>
          )
        )}

        <button className="num largo-2" onClick={() => digitar("0")}>
          0
        </button>
        <button className="num" onClick={ponto}>
          .
        </button>
        <button onClick={igual}>=</button>
      </div>
    </div>
  );
}

export default Calculadora;
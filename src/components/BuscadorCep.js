import { useState } from "react";

function BuscadorCep() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function alterarCep(e) {
    const soNumeros = e.target.value.replace(/\D/g, "").slice(0, 8);
    setCep(soNumeros);
  }

  async function buscar(evento) {
    evento.preventDefault();
    setErro("");
    setEndereco(null);

    if (cep.length !== 8) {
      setErro("Digite um CEP com 8 números.");
      return;
    }

    setCarregando(true);
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        setErro("CEP não encontrado.");
      } else {
        setEndereco(dados);
      }
    } catch (e) {
      setErro("Não foi possível consultar o CEP. Verifique sua conexão.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="cep">
      <h2>Buscador de CEP</h2>

      <form onSubmit={buscar} className="cep-form">
        <input
          type="text"
          inputMode="numeric"
          placeholder="Digite o CEP (só números)"
          value={cep}
          onChange={alterarCep}
        />
        <button type="submit" disabled={carregando}>
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {erro && <p className="cep-erro">{erro}</p>}

      {endereco && (
        <div className="cep-resultado">
          <p>
            <strong>CEP:</strong> {endereco.cep}
          </p>
          <p>
            <strong>Rua:</strong> {endereco.logradouro || "—"}
          </p>
          <p>
            <strong>Bairro:</strong> {endereco.bairro || "—"}
          </p>
          <p>
            <strong>Cidade:</strong> {endereco.localidade} - {endereco.uf}
          </p>
        </div>
      )}
    </div>
  );
}

export default BuscadorCep;
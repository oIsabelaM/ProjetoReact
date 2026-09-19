import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Contador from "./components/Contador";
import JogoDaVelha from "./components/JogoDaVelha";
import Calculadora from "./components/Calculadora";
import BuscadorCep from "./components/BuscadorCep";

function App() {
  const [pagina, setPagina] = useState("To-Do List");

  const telas = {
    "To-Do List": <TodoList />,
    "Contador de Cliques": <Contador />,
    "Jogo da Velha": <JogoDaVelha />,
    "Calculadora": <Calculadora />,
    "Buscador de CEP": <BuscadorCep />,
  };

  return (
    <div className="app">
      <Header paginaAtual={pagina} aoTrocar={setPagina} />
      <main className="conteudo">{telas[pagina]}</main>
    </div>
  );
}

export default App;
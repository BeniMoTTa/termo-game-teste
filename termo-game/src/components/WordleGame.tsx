import React, { useEffect, useState } from "react";

const WordleGame = () => {
  const [palavraSecreta, setPalavraSecreta] = useState(gerarPalavra());
  const [tentativa, setTentativa] = useState("");
  const [resultado, setResultado] = useState<string | null>("");
  const [tentativasRealizadas, setTentativasRealizadas] = useState(0);

  function gerarPalavra() {
    const palavras = [
      "sabio",
      "furia",
      "pleno",
      "fazer",
      "caber",
      "julho",
      "treva",
      "amora",
      "pauta",
      "labio",
    ];
    return palavras[Math.floor(Math.random() * palavras.length)];
  }
  const verificarTentativa = () => {
    if (tentativa === palavraSecreta) {
      setResultado("Você venceu! A palavra era " + palavraSecreta);
    } else {
      const letrasCorretas = [];
      const letrasIncorretas = [];
      for (let i = 0; i < tentativa.length; i++) {
        if (palavraSecreta.includes(tentativa[i])) {
          if (palavraSecreta[i] === tentativa[i]) {
            letrasCorretas.push(tentativa[i]);
          } else {
            letrasIncorretas.push(tentativa[i]);
          }
        }
      }
      setResultado(null);
    }
    setTentativasRealizadas(tentativasRealizadas + 1);
  };
  useEffect(() => {
    const tentativasRows = [];
    for (let i = 0; i < tentativasRealizadas + 1; i++) {
      tentativasRows.push(
        <div key={i} className="flex space-x-2 mt-2">
          {[...Array(5)].map((_, j) => (
            <div
              key={j}
              className={
                i < tentativasRealizadas
                  ? "w-6 h-6 bg-gray-300 rounded"
                  : "w-6 h-6 bg-white rounded"
              }
            >
              {i < tentativasRealizadas && tentativa[j] ? tentativa[j] : null}
            </div>
          ))}
        </div>
      );
    }
    setResultado(resultado);
    setTentativa(tentativa);
    return () => {
      setPalavraSecreta("");
      setTentativa("");
      setResultado(null);
      setTentativasRealizadas(0);
    };
  }, [tentativa, resultado, tentativasRealizadas]);
  const renderTentativas = () => {
    const tentativasRows = [];
    for (let i = 0; i < tentativasRealizadas + 1; i++) {
      tentativasRows.push(
        <div key={i} className="flex space-x-2 mt-2">
          {[...Array(5)].map((_, j) => (
            <div key={j} className="w-6 h-6 bg-gray-300 rounded"></div>
          ))}
        </div>
      );
    }
    return tentativasRows;
  };
  return (
    <div className="container mx-auto text-center mt-8">
      <h1 className="text-3xl font-semibold mb-4">Wordle Game</h1>
      <p>Adivinhe a palavra secreta de 5 letras.</p>
      <div className="flex flex-wrap justify-center mt-4">
        {[...Array(5)].map((_, j) => (
          <input
            type="text"
            maxLength={1}
            key={j}
            className="border p-2 mt-4"
            onChange={(e) => setTentativa(e.target.value)}
          />
        ))}
      </div>
      <button
        className="bg-blue-500 text-white p-2 mt-2 hover:bg-blue-600 rounded"
        onClick={verificarTentativa}
      >
        Verificar
      </button>
      <p className="mt-4">{resultado}</p>
      <div className="mt-4">{renderTentativas()}</div>
    </div>
  );
};

export default WordleGame;

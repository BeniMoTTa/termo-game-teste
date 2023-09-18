import WordleGame from "./components/WordleGame";

function App() {
  return (
    <>
      <div className="main">
        <header className="main-header">
          <h1>Wordle/Termo Game</h1>
          <WordleGame />
        </header>
      </div>
    </>
  );
}

export default App;

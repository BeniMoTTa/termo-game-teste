import { WordleGame } from "./components/WordleGame";

function App() {
  return (
    <>
      <div className="bg-[#084D6E] main flex flex-col">
        <header className="main-header flex w-full justify-center text-[55px] font-bold mt-[25px] ">
          <div className="p-1 border-2 border-[black] background rounded-xl">
            <h1>
              <span className="title-word title-word-1">Wordle</span>
              <span className="title-word title-word-2"> / </span>
              <span className="title-word title-word-3">Termo</span>
              <span className="title-word title-word-4"> Game</span>
            </h1>
          </div>
        </header>
        <WordleGame />
      </div>
    </>
  );
}

export default App;

import { WordleGame } from "./components/WordleGame";

function App() {
  return (
    <>
      <div className="bg-[#084D6E] main flex flex-col">
        <header className="main-header flex w-full justify-center text-[55px] font-bold mt-[25px] "></header>
        <WordleGame />
      </div>
    </>
  );
}

export default App;

import { Components } from "./components/Components";
import { Program } from "./components/program/Program";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[1600px] justify-between gap-4 p-8">
        <Program />
        <Components />
      </div>
    </div>
  );
}

export default App;

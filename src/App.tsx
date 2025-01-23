import "./App.css";
import Navbar from "./components/Navbar";
import { EditorProvider } from "./contexts/EditorContext";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <EditorProvider>
      <div className="h-screen w-screen flex flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-auto">
          <Navbar />
          <Canvas />
        </div>
      </div>
    </EditorProvider>
  );
}

export default App;

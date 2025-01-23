import "./App.css";
import Navbar from "./components/Navbar";
import { useEditor } from "./contexts/EditorContext";
import Canvas from "./components/Canvas/index";
import Sidebar from "./components/Sidebar";
import EditorDrawer from "./components/EditorDrawer/index";

function App() {
  const { state } = useEditor();
  return (
    <div className="h-screen w-screen flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto h-screen">
        <Navbar />
        <div className="flex flex-row flex-1">
          <Canvas />
          {state.openDrawer && <EditorDrawer />}
        </div>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
      <div className="h-screen flex flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
        </div>
      </div>
  );
}

export default App;

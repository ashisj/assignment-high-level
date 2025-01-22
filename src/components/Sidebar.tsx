import { Home, User, Settings, Plus } from "lucide-react";

const menuItems = [
  { icon: <Home size={24} />, label: "Dashboard" },
  { icon: <User size={24} />, label: "User" },
  { icon: <Settings size={24} />, label: "Settings" },
];

function Sidebar() {
  return (
    <div className="bg-gray-50 border-r w-20 flex flex-col items-center py-4 space-y-6">
      <button className="text-white bg-green-500 p-2 rounded">
        <Plus size={20} />
      </button>
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="text-gray-500 hover:text-blue-500 flex flex-col items-center"
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default Sidebar;

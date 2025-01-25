import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";

import {
  LeftNavButtons,
  EditorMenuItems,
  DrawerType,
  RightNavButtons,
} from "../constants/layouts";
import { useEditor } from "@/contexts/EditorContext";

interface NavButton {
  icon: LucideIcon;
  label: string;
}

interface MenuItem extends NavButton {
  type: DrawerType;
  menuItems: {
    label: string;
    action?: "add" | "manage";
  }[];
}

const NavbarButton = ({ icon: Icon, label, onClick }: NavButton & { onClick: (label: string) => void }  ) => (
  <Button variant="ghost" className="text-gray-500 px-3 h-10" onClick={() => onClick(label)}  >
    <Icon size={20} />
    {label}
  </Button>
);

const EditorMenuItem = ({
  icon: Icon,
  label,
  type,
  menuItems,
  onMenuItemClick,
}: MenuItem & {
  onMenuItemClick: (type: DrawerType) => void;
}) => (
  <MenubarMenu>
    <MenubarTrigger className="text-gray-500">
      <Icon size={20} />
      {label}
    </MenubarTrigger>
    <MenubarContent>
      {menuItems.map((item) => (
        <MenubarItem
          key={item.label}
          onClick={() =>
            item.action === "add" ? onMenuItemClick(type) : undefined
          }
        >
          {item.label}
        </MenubarItem>
      ))}
    </MenubarContent>
  </MenubarMenu>
);

function Navbar() {
  const { dispatch, saveState } = useEditor();
  
  const handleClick = (key: string) => {
    console.log("clicked", key);
    if (key === "save") {
      saveState();
    }
  };

  const handleMenuItemClick = (type: DrawerType) => {
    dispatch({ type: "SET_DRAWER_TYPE", payload: { drawerType: type } });
    dispatch({ type: "OPEN_DRAWER" });
  };

  return (
    <div className="bg-gray-100 border-b h-16 flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-0">
          {LeftNavButtons.map((button) => (
            <NavbarButton key={button.label} {...button} onClick={() => {}} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Menubar>
          {EditorMenuItems.map((item) => (
            <EditorMenuItem
              {...item}
              onMenuItemClick={handleMenuItemClick}
            />
          ))}
        </Menubar>
        <Menubar>
          {RightNavButtons.map((item) => (
            <NavbarButton {...item} onClick={() => handleClick(item.key)} />
          ))}
        </Menubar>
      </div>
    </div>
  );
}

export default Navbar;

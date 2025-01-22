import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";

import EditorDrawer from "./EditorDrawer";
import {
  LeftNavButtons,
  EditorMenuItems,
  DrawerType,
  UtilityMenuItems,
} from "../constants/layouts";

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

interface PreviewMenuItem extends NavButton {
  menuItems: {
    label: string;
  }[];
}

const NavbarButton = ({ icon: Icon, label }: NavButton) => (
  <Button variant="ghost" className="text-gray-500 px-3 h-10">
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

const UtilityMenuItem = ({ icon: Icon, label, menuItems }: PreviewMenuItem) => (
  <MenubarMenu>
    <MenubarTrigger className="text-gray-500">
      <Icon size={20} />
      {label}
    </MenubarTrigger>
    <MenubarContent>
      {menuItems.map((item) => (
        <MenubarItem key={item.label}>{item.label}</MenubarItem>
      ))}
    </MenubarContent>
  </MenubarMenu>
);

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDrawerType, setSelectedDrawerType] =
    useState<DrawerType>(null);

  const handleMenuItemClick = (type: DrawerType) => {
    setSelectedDrawerType(type);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="bg-gray-100 border-b h-16 flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-0">
            {LeftNavButtons.map((button) => (
              <NavbarButton key={button.label} {...button} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Menubar>
            {EditorMenuItems.map((item) => (
              <EditorMenuItem
                key={item.label}
                {...item}
                onMenuItemClick={handleMenuItemClick}
              />
            ))}
          </Menubar>
          <Menubar>
            {UtilityMenuItems.map((item) => (
              <UtilityMenuItem key={item.label} {...item} />
            ))}
          </Menubar>
        </div>
      </div>

      <EditorDrawer
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedDrawerType(null);
        }}
        drawerType={selectedDrawerType}
      />
    </>
  );
}

export default Navbar;

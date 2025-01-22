import {
  LucideIcon,
  Maximize,
  Menu,
  Columns3,
  CodeXml,
  ArrowLeft,
  Laptop,
  TabletSmartphone,
  Save,
  Eye,
} from "lucide-react";

export interface NavButton {
  icon: LucideIcon;
  label: string;
}

export interface MenuItem extends NavButton {
  type: DrawerType;
  menuItems: {
    label: string;
    action?: "add" | "manage";
  }[];
}

export interface PreviewMenuItem extends NavButton {
  menuItems: {
    label: string;
  }[];
}

export type DrawerType = "section" | "row" | "column" | "element" | null;

export const LeftNavButtons: NavButton[] = [
  { icon: ArrowLeft, label: "Back" },
  { icon: Laptop, label: "Desktop" },
  { icon: TabletSmartphone, label: "Mobile" },
];

export const EditorMenuItems: MenuItem[] = [
  {
    icon: Maximize,
    label: "Sections",
    type: "section",
    menuItems: [
      { label: "Add section", action: "add" },
    //   { label: "Manage sections", action: "manage" },
    ],
  },
  {
    icon: Menu,
    label: "Rows",
    type: "row",
    menuItems: [
      { label: "Add row", action: "add" },
    //   { label: "Manage rows", action: "manage" },
    ],
  },
  {
    icon: Columns3,
    label: "Columns",
    type: "column",
    menuItems: [
      { label: "Add column", action: "add" },
    //   { label: "Manage columns", action: "manage" },
    ],
  },
  {
    icon: CodeXml,
    label: "Elements",
    type: "element",
    menuItems: [
      { label: "Add element", action: "add" },
    //   { label: "Manage elements", action: "manage" },
    ],
  },
];

export const UtilityMenuItems: PreviewMenuItem[] = [
  {
    icon: Eye,
    label: "Preview",
    menuItems: [
      { label: "Desktop view" },
      { label: "Mobile view" },
      { label: "Tablet view" },
    ],
  },
  {
    icon: Save,
    label: "Save",
    menuItems: [
      { label: "Save changes" },
      { label: "Save as draft" },
      { label: "Save as template" },
    ],
  },
]; 
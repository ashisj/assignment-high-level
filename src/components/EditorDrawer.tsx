import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import {
  rowLayouts,
  sectionLayouts,
  columnLayouts,
  elementConfigs,
} from "../constants/drawer";
import { useEditor } from "../contexts/EditorContext";

interface EditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerType: "section" | "row" | "column" | "element" | null;
}

const ElementButton = ({
  icon,
  label,
  iconClass = "",
  onClick,
}: {
  icon: string;
  label: string;
  iconClass?: string;
  onClick?: () => void;
}) => (
  <Button
    variant="outline"
    className="w-full justify-start gap-2"
    onClick={onClick}
  >
    <span className={`text-xl ${iconClass}`}>{icon}</span>
    {label}
  </Button>
);

const ElementSection = ({
  title,
  elements,
  handleElementAdd,
}: {
  title: string;
  elements: typeof elementConfigs.text;
  handleElementAdd: (elementType: string) => void;
}) => (
  <div className="space-y-2">
    <h3 className="text-sm font-medium mb-2">{title}</h3>

    {elements.map((element) => (
      <ElementButton
        key={element.id}
        icon={element.icon}
        label={element.label}
        iconClass={element.iconClass}
        // onClick={() => console.log(`${element.id} selected`)}
        onClick={() => handleElementAdd(element.id  )}
      />
    ))}
  </div>
);

const RowLayoutButton = ({
  layout,
  onClick,
}: {
  layout: (typeof rowLayouts)[0];
  onClick: () => void;
}) => (
  <Button
    variant="outline"
    className="h-24 flex flex-col items-center justify-center gap-2"
    onClick={onClick}
  >
    <div className="flex gap-1">
      {layout.cols.map((width, index) => (
        <div
          key={index}
          className={`h-8 border-2 border-gray-400 rounded`}
          style={{ width: `${width * 0.5}rem` }}
        />
      ))}
    </div>
    <span className="text-sm">{layout.label}</span>
  </Button>
);

const LayoutCard = ({
  icon,
  label,
  description,
  onClick,
}: {
  icon: string;
  label: string;
  description: string;
  onClick?: () => void;
}) => (
  <Button
    variant="outline"
    className="h-auto p-4 flex flex-col items-start gap-2 text-left"
    onClick={onClick}
  >
    <div className="flex items-center gap-2 w-full">
      <span className="text-2xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
    <p className="text-sm text-gray-500">{description}</p>
  </Button>
);

function EditorDrawer({ isOpen, onClose, drawerType }: EditorDrawerProps) {
  const { state, dispatch } = useEditor();

  const handleSectionAdd = (sectionType: string) => {
    console.log("sectionType", sectionType);

    if (sectionType === "blank") {
      dispatch({ type: "ADD_SECTION", payload: { sectionType } });
    }
    onClose();
  };

  const handleRowAdd = (columns: number[]) => {
    if (state.selectedIds.sectionId) {
      dispatch({
        type: "ADD_ROW",
        payload: {
          columns,
          sectionId: state.selectedIds.sectionId,
        },
      });
    } else {
      alert("No section selected");
    }
    onClose();
  };

  const handleElementAdd = (elementType: string) => {
    if(state.selectedIds.sectionId && state.selectedIds.rowId && state.selectedIds.columnId) {
      dispatch({
        type: "ADD_ELEMENT",
        payload: {
          sectionId: state.selectedIds.sectionId,
          rowId: state.selectedIds.rowId,
          columnId: state.selectedIds.columnId,
          element: {
            id: `${elementType}-${Date.now()}`,
            type: elementType,
            content: "",
          },
        },
      });
    } else {
      alert("No section selected, row, or column selected");
    }
    onClose();
  };


  if (!drawerType) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] h-screen">
        <SheetHeader>
          <SheetTitle>{`Add New ${
            drawerType.charAt(0).toUpperCase() + drawerType.slice(1)
          }`}</SheetTitle>
        </SheetHeader>

        {drawerType === "section" && (
          <div className="mt-4 grid grid-cols-1 gap-4 overflow-y-auto">
            {sectionLayouts.map((section) => (
              <LayoutCard
                key={section.id}
                icon={section.icon}
                label={section.label}
                description={section.description}
                onClick={() => handleSectionAdd(section.id)}
              />
            ))}
          </div>
        )}

        {drawerType === "row" && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {rowLayouts.map((layout) => (
              <RowLayoutButton
                key={layout.id}
                layout={layout}
                onClick={() => handleRowAdd(layout.cols)}
              />
            ))}
          </div>
        )}

        {drawerType === "column" && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            {columnLayouts.map((column) => (
              <LayoutCard
                key={column.id}
                icon={column.icon}
                label={column.label}
                description={column.description}
                onClick={() => console.log(`${column.id} column selected`)}
              />
            ))}
          </div>
        )}

        {drawerType === "element" && (
          <div className="mt-4">
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search elements..." className="pl-8" />
            </div>

            <Tabs defaultValue="all">
              <TabsList className="w-full">
                {["all", "text", "media", "form", "misc"].map((tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="grid grid-rows-2 gap-4">
                  <ElementSection title="Text" elements={elementConfigs.text} handleElementAdd={handleElementAdd} />
                  <ElementSection
                    title="Media"
                    elements={elementConfigs.media}
                    handleElementAdd={handleElementAdd}
                  />
                  <ElementSection title="Form" elements={elementConfigs.form} handleElementAdd={handleElementAdd} />
                  <ElementSection
                    title="Advanced Form"
                    elements={elementConfigs.advanced}
                    handleElementAdd={handleElementAdd}
                  />
                </div>
              </TabsContent>
              <TabsContent value="text" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <ElementSection title="Text" elements={elementConfigs.text} handleElementAdd={handleElementAdd} />
                </div>
              </TabsContent>
              <TabsContent value="media" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <ElementSection
                    title="Media"
                    elements={elementConfigs.media}
                    handleElementAdd={handleElementAdd}
                  />
                </div>
              </TabsContent>
              <TabsContent value="form" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <ElementSection title="Form" elements={elementConfigs.form} handleElementAdd={handleElementAdd} />
                </div>
              </TabsContent>
              <TabsContent value="misc" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <ElementSection
                    title="Advanced Form"
                    elements={elementConfigs.advanced}
                    handleElementAdd={handleElementAdd}
                  />
                </div>
              </TabsContent>

              {/* Add other tab contents as needed */}
            </Tabs>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default EditorDrawer;

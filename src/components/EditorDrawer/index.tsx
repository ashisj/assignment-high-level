import { useEditor } from "@/contexts/EditorContext";
import { sectionLayouts, rowLayouts, columnLayouts } from "@/constants/drawer";
import LayoutCard from "./LayoutCard";
import RowLayoutButton from "./RowLayoutButton";
import ElementContent from "./ElementContent";
import { X } from "lucide-react";

function EditorDrawer() {
  const { state, dispatch } = useEditor();

  const handleSectionAdd = (sectionType: string) => {
    console.log("sectionType", sectionType);

    dispatch({ type: "ADD_SECTION", payload: { sectionType } });

    dispatch({ type: "CLOSE_DRAWER" });
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

      dispatch({ type: "CLOSE_DRAWER" });
    } else {
      alert("Please select a section to add a row");
    }
  };

  const handleElementAdd = (elementType: string) => {
    if (
      state.selectedIds.sectionId &&
      state.selectedIds.rowId &&
      state.selectedIds.columnId
    ) {
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
      dispatch({ type: "CLOSE_DRAWER" });
    } else {
      alert("Please select a section, row, and column to add an element");
    }
  };

  if (!state.drawerType) return null;

  return (
    <div className="w-[400px] p-4 overflow-y-auto" id="drawer">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          {`Add New ${
            state.drawerType.charAt(0).toUpperCase() + state.drawerType.slice(1)
          }`}
        </div>
        <button
          onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {state.drawerType === "section" && (
        <div className="mt-4 grid grid-cols-1 gap-4 ">
          {sectionLayouts.map((section) => (
            <LayoutCard
              key={section.id}
              {...section}
              onClick={() => handleSectionAdd(section.id)}
            />
          ))}
        </div>
      )}

      {state.drawerType === "row" && (
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

      {state.drawerType === "column" && (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {columnLayouts.map((column) => (
            <LayoutCard
              key={column.id}
              {...column}
              onClick={() => console.log(`${column.id} column selected`)}
            />
          ))}
        </div>
      )}

      {state.drawerType === "element" && (
        <ElementContent handleElementAdd={handleElementAdd} />
      )}
    </div>
  );
}

export default EditorDrawer;
